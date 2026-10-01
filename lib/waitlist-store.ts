import crypto from "crypto";
import { queryD1, executeD1, executeD1Changes } from "@/lib/d1";

export type OtpRecord = {
  email: string;
  otp: string;
  expiresAt: number;
  lastSentAt: number;
  attempts: number;
  verified: boolean;
};

export type WaitlistSubmissionRecord = {
  id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  emailVerified: boolean;
  age: number;
  foundationImportanceRating: number;
  foundationalKnowledgeRating: number;
  businessIdea: string;
  willingToLaunchIn2027: "Yes" | "No";
  businessPotentialReason: string;
  canGiveThreeHours: "Yes" | "No";
  createdAt: string;
};

const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const VERIFIED_TTL_MS = 30 * 60 * 1000; // verified email stays valid for 30 minutes
const MAX_VERIFY_ATTEMPTS = 5;

// OTP / verification state lives in D1 (not process memory) so it works across
// serverless instances (Vercel).
let otpTableReady: Promise<void> | null = null;

function ensureOtpTable(): Promise<void> {
  if (!otpTableReady) {
    otpTableReady = executeD1(
      `CREATE TABLE IF NOT EXISTS waitlist_otp (
        email TEXT PRIMARY KEY,
        otp TEXT NOT NULL DEFAULT '',
        expires_at INTEGER NOT NULL DEFAULT 0,
        last_sent_at INTEGER NOT NULL DEFAULT 0,
        attempts INTEGER NOT NULL DEFAULT 0,
        verified_until INTEGER NOT NULL DEFAULT 0
      )`
    )
      .then(() => undefined)
      .catch((err) => {
        otpTableReady = null;
        throw err;
      });
  }
  return otpTableReady;
}

type OtpRow = {
  email: string;
  otp: string;
  expires_at: number;
  last_sent_at: number;
  attempts: number;
  verified_until: number;
};

async function getOtpRow(email: string): Promise<OtpRow | null> {
  await ensureOtpTable();
  const rows = await queryD1<OtpRow>("SELECT * FROM waitlist_otp WHERE email = ?", [email]);
  return rows[0] || null;
}

/**
 * Generates a secure random 4-digit numeric OTP (0000 - 9999)
 */
export function generateRandomOtp(): string {
  const num = crypto.randomInt(0, 10000);
  return num.toString().padStart(4, "0");
}

/**
 * Creates and stores a new OTP for the given email address.
 * The cooldown check and the write are a single atomic upsert, so concurrent
 * requests cannot each get past the cooldown.
 */
export async function generateAndStoreOtp(rawEmail: string): Promise<{
  otp: string;
  cooldownRemaining?: number;
  error?: string;
}> {
  const email = rawEmail.toLowerCase().trim();
  const now = Date.now();
  await ensureOtpTable();

  const otp = generateRandomOtp();
  const changes = await executeD1Changes(
    `INSERT INTO waitlist_otp (email, otp, expires_at, last_sent_at, attempts, verified_until)
     VALUES (?, ?, ?, ?, 0, 0)
     ON CONFLICT(email) DO UPDATE SET
       otp = excluded.otp,
       expires_at = excluded.expires_at,
       last_sent_at = excluded.last_sent_at,
       attempts = 0,
       verified_until = 0
     WHERE waitlist_otp.last_sent_at <= ?`,
    [email, otp, now + OTP_TTL_MS, now, now - RESEND_COOLDOWN_MS]
  );

  if (changes === 0) {
    const existing = await getOtpRow(email);
    const elapsed = now - (existing?.last_sent_at ?? 0);
    const cooldownRemaining = Math.max(1, Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000));
    return {
      otp: "",
      cooldownRemaining,
      error: `Please wait ${cooldownRemaining} seconds before requesting a new OTP.`,
    };
  }

  return { otp };
}

/**
 * Removes a stored OTP, e.g. when the email could not be sent, so the user is
 * not locked out by the resend cooldown.
 */
export async function discardOtp(rawEmail: string): Promise<void> {
  const email = rawEmail.toLowerCase().trim();
  await ensureOtpTable();
  await executeD1("DELETE FROM waitlist_otp WHERE email = ?", [email]);
}

/**
 * Verifies the OTP submitted by the user.
 * Each guess is counted with an atomic UPDATE before it is compared, so
 * parallel requests cannot exceed MAX_VERIFY_ATTEMPTS.
 */
export async function verifyOtpCode(
  rawEmail: string,
  submittedOtp: string
): Promise<{ success: boolean; error?: string }> {
  const email = rawEmail.toLowerCase().trim();
  const cleanOtp = submittedOtp.trim();
  const now = Date.now();
  await ensureOtpTable();

  const counted = await executeD1Changes(
    `UPDATE waitlist_otp SET attempts = attempts + 1
     WHERE email = ? AND otp != '' AND attempts < ? AND expires_at >= ?`,
    [email, MAX_VERIFY_ATTEMPTS, now]
  );

  if (counted === 0) {
    const record = await getOtpRow(email);
    if (!record || !record.otp) {
      return { success: false, error: "No OTP request found for this email. Please request a new OTP." };
    }
    await executeD1("DELETE FROM waitlist_otp WHERE email = ?", [email]);
    if (now > record.expires_at) {
      return { success: false, error: "This OTP has expired. Please request a new OTP." };
    }
    return { success: false, error: "Too many failed attempts. Please request a new OTP." };
  }

  // Marks verified only if this exact OTP is still live; also makes the code single-use.
  const verified = await executeD1Changes(
    `UPDATE waitlist_otp SET otp = '', verified_until = ?
     WHERE email = ? AND otp = ?`,
    [now + VERIFIED_TTL_MS, email, cleanOtp]
  );

  if (verified === 0) {
    const record = await getOtpRow(email);
    const remainingAttempts = Math.max(0, MAX_VERIFY_ATTEMPTS - (record?.attempts ?? MAX_VERIFY_ATTEMPTS));
    return {
      success: false,
      error: `Invalid verification code. ${remainingAttempts} attempt(s) remaining.`,
    };
  }

  return { success: true };
}

export async function isEmailVerifiedOnServer(rawEmail: string): Promise<boolean> {
  const email = rawEmail.toLowerCase().trim();
  const record = await getOtpRow(email);
  return !!record && record.verified_until > Date.now();
}

export async function resetEmailVerification(rawEmail: string): Promise<void> {
  const email = rawEmail.toLowerCase().trim();
  await ensureOtpTable();
  await executeD1("DELETE FROM waitlist_otp WHERE email = ?", [email]);
}

/**
 * Async check if email has already registered on waitlist in D1.
 */
export async function isEmailRegisteredOnWaitlistD1(rawEmail: string): Promise<boolean> {
  const email = rawEmail.toLowerCase().trim();

  const rows = await queryD1<{ count: number }>(
    "SELECT count(*) as count FROM waitlist WHERE LOWER(email) = ?",
    [email]
  );
  return (rows[0]?.count || 0) > 0;
}

/**
 * Adds a new completed waitlist submission to D1 database.
 */
export async function saveWaitlistSubmissionD1(
  data: Omit<WaitlistSubmissionRecord, "id" | "createdAt" | "emailVerified"> & { docId?: string }
): Promise<{ success: boolean; id?: string; error?: string }> {
  const email = data.email.toLowerCase().trim();

  const isRegistered = await isEmailRegisteredOnWaitlistD1(email);
  if (isRegistered) {
    return { success: false, error: "This email address is already registered on our waitlist!" };
  }

  const id = data.docId || `wl_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  const submittedAt = new Date().toISOString();

  let d1Success = false;
  try {
    d1Success = await executeD1(
      `INSERT INTO waitlist (
        doc_id, first_name, last_name, contact_number, email, age,
        foundation_importance_rating, foundational_knowledge_rating,
        business_idea, willing_to_launch_2027, business_potential_reason,
        can_give_three_hours, submitted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.firstName.trim(),
        data.lastName.trim(),
        data.contactNumber,
        email,
        data.age,
        data.foundationImportanceRating,
        data.foundationalKnowledgeRating,
        data.businessIdea.trim(),
        data.willingToLaunchIn2027,
        data.businessPotentialReason.trim(),
        data.canGiveThreeHours,
        submittedAt,
      ]
    );
  } catch (err: any) {
    console.error("D1 waitlist insert error:", err.message);
    if (/UNIQUE|constraint/i.test(err.message || "")) {
      return { success: false, error: "This email address is already registered on our waitlist!" };
    }
    return { success: false, error: "We could not save your registration right now. Please try again shortly." };
  }

  if (!d1Success) {
    return { success: false, error: "We could not save your registration right now. Please try again shortly." };
  }

  try {
    await resetEmailVerification(email);
  } catch (err: any) {
    console.warn("Failed to clear waitlist verification state:", err.message);
  }
  return { success: true, id };
}
