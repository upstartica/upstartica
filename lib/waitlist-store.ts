import crypto from "crypto";
import { queryD1, executeD1 } from "@/lib/d1";

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

// Global memory stores to persist across HMR in Next.js development mode
const globalStore = global as unknown as {
  __waitlistOtpStore?: Map<string, OtpRecord>;
  __waitlistVerifiedEmails?: Set<string>;
  __waitlistSubmissions?: Map<string, WaitlistSubmissionRecord>;
};

if (!globalStore.__waitlistOtpStore) {
  globalStore.__waitlistOtpStore = new Map();
}
if (!globalStore.__waitlistVerifiedEmails) {
  globalStore.__waitlistVerifiedEmails = new Set();
}
if (!globalStore.__waitlistSubmissions) {
  globalStore.__waitlistSubmissions = new Map();
}

const otpStore = globalStore.__waitlistOtpStore;
const verifiedEmails = globalStore.__waitlistVerifiedEmails;
const submissionsStore = globalStore.__waitlistSubmissions;

const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_VERIFY_ATTEMPTS = 5;

/**
 * Generates a secure random 4-digit numeric OTP (0000 - 9999)
 */
export function generateRandomOtp(): string {
  const num = crypto.randomInt(0, 10000);
  return num.toString().padStart(4, "0");
}

/**
 * Creates and stores a new OTP for the given email address.
 */
export function generateAndStoreOtp(rawEmail: string): {
  otp: string;
  cooldownRemaining?: number;
  error?: string;
} {
  const email = rawEmail.toLowerCase().trim();
  const now = Date.now();

  const existing = otpStore.get(email);
  if (existing) {
    const elapsed = now - existing.lastSentAt;
    if (elapsed < RESEND_COOLDOWN_MS) {
      const cooldownRemaining = Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000);
      return {
        otp: "",
        cooldownRemaining,
        error: `Please wait ${cooldownRemaining} seconds before requesting a new OTP.`,
      };
    }
  }

  const otp = generateRandomOtp();
  verifiedEmails.delete(email);

  otpStore.set(email, {
    email,
    otp,
    expiresAt: now + OTP_TTL_MS,
    lastSentAt: now,
    attempts: 0,
    verified: false,
  });

  return { otp };
}

/**
 * Verifies the OTP submitted by the user.
 */
export function verifyOtpCode(
  rawEmail: string,
  submittedOtp: string
): { success: boolean; error?: string } {
  const email = rawEmail.toLowerCase().trim();
  const cleanOtp = submittedOtp.trim();

  const record = otpStore.get(email);
  if (!record) {
    return { success: false, error: "No OTP request found for this email. Please request a new OTP." };
  }

  const now = Date.now();

  if (now > record.expiresAt) {
    otpStore.delete(email);
    return { success: false, error: "This OTP has expired. Please request a new OTP." };
  }

  if (record.attempts >= MAX_VERIFY_ATTEMPTS) {
    otpStore.delete(email);
    return { success: false, error: "Too many failed attempts. Please request a new OTP." };
  }

  record.attempts += 1;

  if (record.otp !== cleanOtp) {
    const remainingAttempts = MAX_VERIFY_ATTEMPTS - record.attempts;
    return {
      success: false,
      error: `Invalid verification code. ${remainingAttempts} attempt(s) remaining.`,
    };
  }

  record.verified = true;
  verifiedEmails.add(email);
  otpStore.delete(email);

  return { success: true };
}

export function isEmailVerifiedOnServer(rawEmail: string): boolean {
  const email = rawEmail.toLowerCase().trim();
  return verifiedEmails.has(email);
}

export function resetEmailVerification(rawEmail: string): void {
  const email = rawEmail.toLowerCase().trim();
  verifiedEmails.delete(email);
  otpStore.delete(email);
}

/**
 * Sync check if email has already registered on waitlist.
 */
export function isEmailRegisteredOnWaitlist(rawEmail: string): boolean {
  const email = rawEmail.toLowerCase().trim();
  return submissionsStore.has(email);
}

/**
 * Async check if email has already registered on waitlist in D1.
 */
export async function isEmailRegisteredOnWaitlistD1(rawEmail: string): Promise<boolean> {
  const email = rawEmail.toLowerCase().trim();

  try {
    const rows = await queryD1<{ count: number }>(
      "SELECT count(*) as count FROM waitlist WHERE LOWER(email) = ?",
      [email]
    );
    return (rows[0]?.count || 0) > 0;
  } catch {
    return false;
  }
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
      `INSERT OR REPLACE INTO waitlist (
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
    return { success: false, error: `Failed to save entry to D1 database: ${err.message}` };
  }

  if (!d1Success) {
    return { success: false, error: "Failed to write record to Cloudflare D1 database." };
  }

  const submission: WaitlistSubmissionRecord = {
    ...data,
    email,
    id,
    emailVerified: true,
    createdAt: submittedAt,
  };
  submissionsStore.set(email, submission);

  verifiedEmails.delete(email);
  return { success: true, id };
}

export function saveWaitlistSubmission(
  data: Omit<WaitlistSubmissionRecord, "id" | "createdAt" | "emailVerified">
) {
  const email = data.email.toLowerCase().trim();
  const id = `wl_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  const submission: WaitlistSubmissionRecord = {
    ...data,
    email,
    id,
    emailVerified: true,
    createdAt: new Date().toISOString(),
  };
  submissionsStore.set(email, submission);
  return { success: true, id };
}
