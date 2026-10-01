"use client";

import { useEffect, useState } from "react";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Mail,
  Lock,
  Sparkles,
  Phone,
  User,
  Copy,
  Check,
} from "lucide-react";
import styles from "../waitlist-modal.module.css";
import type { WaitlistFormData, WaitlistStep } from "@/types/waitlist";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
};

const initialFormData: WaitlistFormData = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  email: "",
  otp: "",
  emailVerified: false,
  age: "",
  foundationImportanceRating: null,
  foundationalKnowledgeRating: null,
  businessIdea: "",
  willingToLaunchIn2027: "",
  businessPotentialReason: "",
  canGiveThreeHours: "",
};

export default function WaitlistModal({ isOpen, onClose, initialEmail = "" }: Props) {
  const [step, setStep] = useState<WaitlistStep>(1);
  const [formData, setFormData] = useState<WaitlistFormData>(initialFormData);

  // OTP & Verification States
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [otpMessage, setOtpMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Submission States
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [applicationDocId, setApplicationDocId] = useState<string>("");
  const [copiedDocId, setCopiedDocId] = useState(false);

  // Pre-fill email when modal opens or initialEmail changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormError(null);
      setOtpMessage(null);
      setFormData((prev) => ({
        ...initialFormData,
        ...prev,
        email: initialEmail || prev.email || "",
      }));
    }
  }, [isOpen, initialEmail]);

  // Resend cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // ESC key to close modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Helper for updating form state
  function updateField<K extends keyof WaitlistFormData>(field: K, value: WaitlistFormData[K]) {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // If user edits email after sending/verifying OTP, reset verification
      if (field === "email" && value !== prev.email) {
        setOtpSent(false);
        setOtpMessage(null);
        next.emailVerified = false;
        next.otp = "";
      }
      return next;
    });
    setFormError(null);
  }

  // Handle Contact Number (numeric only, exactly 10 digits)
  function handlePhoneChange(val: string) {
    const numeric = val.replace(/\D/g, "").slice(0, 10);
    updateField("contactNumber", numeric);
  }

  // Handle OTP Input (numeric only, exactly 4 digits)
  function handleOtpChange(val: string) {
    const numeric = val.replace(/\D/g, "").slice(0, 4);
    updateField("otp", numeric);
  }

  // Send OTP handler
  async function handleSendOtp() {
    if (!formData.email.trim()) {
      setOtpMessage({ type: "error", text: "Please enter a valid email address first." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setOtpMessage({ type: "error", text: "Please enter a valid email format." });
      return;
    }

    setOtpSending(true);
    setOtpMessage(null);

    try {
      const res = await fetch("/api/waitlist/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setOtpMessage({ type: "error", text: data.message || "Failed to send OTP." });
        if (data.cooldownSeconds) {
          setCooldown(data.cooldownSeconds);
        }
      } else {
        setOtpSent(true);
        setCooldown(60); // 60s resend cooldown
        setOtpMessage({ type: "success", text: data.message || "4-digit OTP sent to your email!" });
      }
    } catch (err) {
      setOtpMessage({ type: "error", text: "Network error sending OTP. Please try again." });
    } finally {
      setOtpSending(false);
    }
  }

  // Verify OTP handler
  async function handleVerifyOtp() {
    if (!formData.otp || formData.otp.length !== 4) {
      setOtpMessage({ type: "error", text: "Please enter the 4-digit code sent to your email." });
      return;
    }

    setOtpVerifying(true);
    setOtpMessage(null);

    try {
      const res = await fetch("/api/waitlist/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          otp: formData.otp.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setOtpMessage({ type: "error", text: data.message || "Invalid or expired OTP." });
      } else {
        updateField("emailVerified", true);
        setOtpMessage({ type: "success", text: "✓ Email verified successfully!" });
      }
    } catch (err) {
      setOtpMessage({ type: "error", text: "Network error verifying OTP. Please try again." });
    } finally {
      setOtpVerifying(false);
    }
  }

  // Check if Step 1 is valid
  const isStep1Valid =
    formData.firstName.trim().length > 0 &&
    formData.lastName.trim().length > 0 &&
    formData.contactNumber.length === 10 &&
    formData.email.trim().length > 0 &&
    formData.emailVerified;

  // Proceed to Step 2
  function handleGoToStep2() {
    if (!isStep1Valid) {
      if (!formData.emailVerified) {
        setFormError("Please verify your email address with OTP before continuing.");
      } else {
        setFormError("Please complete all required fields on Page 1.");
      }
      return;
    }
    setFormError(null);
    setStep(2);
  }

  // Final Registration Submission
  async function handleSubmitWaitlist(e: React.FormEvent) {
    e.preventDefault();

    if (step !== 2) return;

    // Validate Step 2 fields
    const parsedAge = Number(formData.age);
    if (!formData.age || isNaN(parsedAge) || parsedAge < 1 || parsedAge > 100) {
      setFormError("Please enter a valid age between 1 and 100.");
      return;
    }

    if (!formData.foundationImportanceRating) {
      setFormError("Please select a rating (1-10) for foundation knowledge importance.");
      return;
    }

    if (!formData.foundationalKnowledgeRating) {
      setFormError("Please rate your current foundational knowledge (1-10).");
      return;
    }

    if (!formData.businessIdea.trim()) {
      setFormError("Please describe your business idea (or write 'Exploring options').");
      return;
    }

    if (!formData.willingToLaunchIn2027) {
      setFormError("Please select whether you are willing to launch in 2027.");
      return;
    }

    if (!formData.businessPotentialReason.trim()) {
      setFormError("Please share what makes you think your idea can make a good business.");
      return;
    }

    if (!formData.canGiveThreeHours) {
      setFormError("Please select if you can dedicate 3 hours daily.");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        contactNumber: formData.contactNumber,
        email: formData.email.trim(),
        age: parsedAge,
        foundationImportanceRating: formData.foundationImportanceRating,
        foundationalKnowledgeRating: formData.foundationalKnowledgeRating,
        businessIdea: formData.businessIdea.trim(),
        willingToLaunchIn2027: formData.willingToLaunchIn2027,
        businessPotentialReason: formData.businessPotentialReason.trim(),
        canGiveThreeHours: formData.canGiveThreeHours,
      };

      const res = await fetch("/api/waitlist/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.message || "Registration failed. Please try again.");
      } else {
        const generatedDocId = data.docId || data.applicationNumber || "";
        setApplicationDocId(generatedDocId);
        setStep(3); // Show Success Screen
      }
    } catch (err) {
      setFormError("Network error during submission. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCopyDocId() {
    if (!applicationDocId) return;
    navigator.clipboard.writeText(applicationDocId);
    setCopiedDocId(true);
    setTimeout(() => setCopiedDocId(false), 2000);
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* CLOSE BUTTON */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* PROGRESS INDICATOR (Steps 1 & 2) */}
        {step !== 3 && (
          <>
            <div className={styles.header}>
              <span className={styles.badge}>
                {step === 1 ? "STEP 1 OF 2 — PERSONAL INFO" : "STEP 2 OF 2 — BUSINESS & VISION"}
              </span>
              <h2 className={styles.title}>
                {step === 1 ? (
                  <>
                    Join the <span>Upstartica Waitlist</span>
                  </>
                ) : (
                  <>
                    Tell us about your <span>ambition</span>
                  </>
                )}
              </h2>
              <p className={styles.subtitle}>
                {step === 1
                  ? "Verify your email and details to lock in your early access."
                  : "Help us tailor our practical framework specifically for your goals."}
              </p>
            </div>

            <div className={styles.progressBarTrack}>
              <div
                className={styles.progressBarFill}
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
          </>
        )}

        {/* ====================================================== */}
        {/* PAGE 1: PERSONAL INFORMATION & EMAIL VERIFICATION */}
        {/* ====================================================== */}
        {step === 1 && (
          <div className={styles.form}>
            {/* FIRST & LAST NAME */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="modal-first-name">
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  id="modal-first-name"
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Rahul"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="modal-last-name">
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  id="modal-last-name"
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Sharma"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* CONTACT NUMBER */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-contact">
                Contact Number <span className={styles.required}>*</span>
              </label>
              <div className={styles.phoneInputGroup}>
                <span className={styles.countryCode}>+91</span>
                <input
                  id="modal-contact"
                  type="tel"
                  className={styles.phoneInput}
                  placeholder="10-digit mobile number"
                  value={formData.contactNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* EMAIL ADDRESS & SEND OTP */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-email">
                Email Address <span className={styles.required}>*</span>
              </label>
              <div className={styles.emailActionRow}>
                <input
                  id="modal-email"
                  type="email"
                  className={styles.input}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  disabled={formData.emailVerified}
                  required
                />

                {!formData.emailVerified && (
                  <button
                    type="button"
                    className={styles.sendOtpBtn}
                    onClick={handleSendOtp}
                    disabled={otpSending || cooldown > 0 || !formData.email.trim()}
                  >
                    {otpSending ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Sending...
                      </>
                    ) : cooldown > 0 ? (
                      `Resend in ${cooldown}s`
                    ) : otpSent ? (
                      "Resend OTP"
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                )}
              </div>

              {formData.emailVerified && (
                <div className={styles.verifiedBadge}>
                  <CheckCircle2 size={16} /> Email verified successfully!
                </div>
              )}
            </div>

            {/* OTP INPUT BOX (Revealed after OTP sent) */}
            {otpSent && !formData.emailVerified && (
              <div className={styles.otpBox}>
                <label className={styles.label} htmlFor="modal-otp">
                  Enter 4-Digit Verification Code (Sent to {formData.email})
                </label>
                <div className={styles.emailActionRow}>
                  <input
                    id="modal-otp"
                    type="text"
                    className={`${styles.input} ${styles.otpInput}`}
                    placeholder="0000"
                    value={formData.otp}
                    onChange={(e) => handleOtpChange(e.target.value)}
                    maxLength={4}
                  />
                  <button
                    type="button"
                    className={styles.verifyOtpBtn}
                    onClick={handleVerifyOtp}
                    disabled={otpVerifying || formData.otp.length !== 4}
                  >
                    {otpVerifying ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* OTP FEEDBACK BANNER */}
            {otpMessage && (
              <div
                className={
                  otpMessage.type === "success" ? styles.successBanner : styles.errorBanner
                }
              >
                {otpMessage.text}
              </div>
            )}

            {/* ERROR BANNER */}
            {formError && <div className={styles.errorBanner}>{formError}</div>}

            {/* CONTINUE BUTTON */}
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={handleGoToStep2}
                disabled={!isStep1Valid}
              >
                Continue to Step 2 <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* PAGE 2: BUSINESS & ENTREPRENEURSHIP */}
        {/* ====================================================== */}
        {step === 2 && (
          <form className={styles.form} onSubmit={handleSubmitWaitlist}>
            {/* AGE */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-age">
                Your Age <span className={styles.required}>*</span>
              </label>
              <input
                id="modal-age"
                type="number"
                min={1}
                max={100}
                className={styles.input}
                placeholder="e.g. 24"
                value={formData.age}
                onChange={(e) => updateField("age", e.target.value)}
                required
              />
            </div>

            {/* RATING 1: Foundation Importance */}
            <div className={styles.field}>
              <p className={styles.ratingLabel}>
                How much do you agree with the fact that, Foundation knowledge about business and entrepreneurship is important to make a successful business? <span className={styles.required}>*</span>
              </p>
              <div className={styles.ratingGrid}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`${styles.ratingPill} ${
                      formData.foundationImportanceRating === val ? styles.ratingPillActive : ""
                    }`}
                    onClick={() => updateField("foundationImportanceRating", val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* RATING 2: Foundational Knowledge Self Rating */}
            <div className={styles.field}>
              <p className={styles.ratingLabel}>
                How much would you rate your foundational knowledge of business and entrepreneurship? <span className={styles.required}>*</span>
              </p>
              <div className={styles.ratingGrid}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`${styles.ratingPill} ${
                      formData.foundationalKnowledgeRating === val ? styles.ratingPillActive : ""
                    }`}
                    onClick={() => updateField("foundationalKnowledgeRating", val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* BUSINESS IDEA TEXTAREA */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-idea">
                Do you have a business idea? <span className={styles.required}>*</span>
              </label>
              <textarea
                id="modal-idea"
                className={styles.textarea}
                placeholder="Briefly describe your idea or vision (e.g. an AI platform for student tutors)..."
                value={formData.businessIdea}
                onChange={(e) => updateField("businessIdea", e.target.value)}
                required
              />
            </div>

            {/* WILLING TO LAUNCH IN 2027 */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-launch-2027">
                Are you willing to launch your business in 2027? <span className={styles.required}>*</span>
              </label>
              <select
                id="modal-launch-2027"
                className={styles.select}
                value={formData.willingToLaunchIn2027}
                onChange={(e) =>
                  updateField("willingToLaunchIn2027", e.target.value as "Yes" | "No")
                }
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* BUSINESS POTENTIAL REASON */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-potential-reason">
                What makes you think that your idea can make a good business? <span className={styles.required}>*</span>
              </label>
              <textarea
                id="modal-potential-reason"
                className={styles.textarea}
                placeholder="Share what problem it solves or why people would pay for it..."
                value={formData.businessPotentialReason}
                onChange={(e) => updateField("businessPotentialReason", e.target.value)}
                required
              />
            </div>

            {/* CAN GIVE 3 HOURS DAILY */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-three-hours">
                Can you give 3 hours everyday for your business, with or without job? <span className={styles.required}>*</span>
              </label>
              <select
                id="modal-three-hours"
                className={styles.select}
                value={formData.canGiveThreeHours}
                onChange={(e) =>
                  updateField("canGiveThreeHours", e.target.value as "Yes" | "No")
                }
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* ERROR BANNER */}
            {formError && <div className={styles.errorBanner}>{formError}</div>}

            {/* BUTTON GROUP */}
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => setStep(1)}
                disabled={submitting}
              >
                <ArrowLeft size={16} /> Back to Step 1
              </button>

              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Complete Waitlist Registration <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ====================================================== */}
        {/* STEP 3: SUCCESS STATE WITH DOCUMENT ID */}
        {/* ====================================================== */}
        {step === 3 && (
          <div className={styles.successCard}>
            <div className={styles.successIconBadge}>
              <Sparkles size={36} />
            </div>
            <h2 className={styles.successTitle}>You&apos;re on the list!</h2>
            <p className={styles.successText}>
              Thank you, <strong>{formData.firstName}</strong>! Your application data has been saved to our database and a confirmation email has been sent to <strong>{formData.email}</strong>.
            </p>

            {/* APPLICATION NUMBER / DOCUMENT ID CARD */}
            {applicationDocId && (
              <div className={styles.docIdCard}>
                <span className={styles.docIdLabel}>APPLICATION NUMBER / DOCUMENT ID</span>
                <div className={styles.docIdValueRow}>
                  <span className={styles.docIdValue}>{applicationDocId}</span>
                  <button
                    type="button"
                    className={styles.copyDocIdBtn}
                    onClick={handleCopyDocId}
                    title="Copy Application ID"
                  >
                    {copiedDocId ? <Check size={16} /> : <Copy size={16} />}
                    {copiedDocId ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            <button type="button" className={styles.submitBtn} onClick={onClose}>
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
