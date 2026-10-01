import nodemailer from "nodemailer";

const getGmailConfig = () => {
  const user = process.env.GMAIL_USER || "edtech.pp01@gmail.com";
  const rawPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || "";
  const pass = rawPass.replace(/\s+/g, "");
  return { user, pass };
};

export async function sendOtpEmail(toEmail: string, otp: string): Promise<{ success: boolean; error?: string }> {
  const { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } = getGmailConfig();
  const subject = "Your Upstartica Verification Code";

  const textBody = `Hi,

Your verification code for joining the Upstartica waitlist is:

${otp}

This code is valid for 5 minutes.

If you did not request this verification code, you can safely ignore this email.

Regards,
Team Upstartica`;

  const htmlBody = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 540px; margin: 0 auto; padding: 32px 24px; background: #f6f2ec; border-radius: 16px; color: #06183b;">
      <h2 style="margin-top: 0; color: #06183b; font-size: 22px;">Upstartica Verification Code</h2>
      <p style="font-size: 15px; color: #4a5975; line-height: 1.6;">Hi,</p>
      <p style="font-size: 15px; color: #4a5975; line-height: 1.6;">Your verification code for joining the Upstartica waitlist is:</p>
      
      <div style="margin: 28px 0; text-align: center;">
        <span style="display: inline-block; padding: 14px 32px; background: #06183b; color: #ff5a05; font-size: 32px; font-weight: 800; letter-spacing: 10px; border-radius: 12px; box-shadow: 0 4px 12px rgba(6, 24, 59, 0.15);">
          ${otp}
        </span>
      </div>
      
      <p style="font-size: 14px; color: #52627d; line-height: 1.5;">This code is valid for <strong>5 minutes</strong>.</p>
      <p style="font-size: 13px; color: #7888a2; line-height: 1.5;">If you did not request this verification code, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid rgba(6, 24, 59, 0.1); margin: 24px 0;" />
      <p style="font-size: 14px; font-weight: 700; color: #06183b; margin-bottom: 0;">Regards,<br /><span style="color: #ff5a05;">Team Upstartica</span></p>
    </div>
  `;

  if (GMAIL_APP_PASSWORD && GMAIL_APP_PASSWORD.trim() !== "") {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD.trim(),
        },
      });

      await transporter.sendMail({
        from: `"Upstartica" <${GMAIL_USER}>`,
        to: toEmail,
        subject,
        text: textBody,
        html: htmlBody,
      });

      return { success: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to send OTP email";
      console.error("[EmailService Error]", errorMsg);
      return { success: false, error: `Email delivery failed: ${errorMsg}` };
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("--------------------------------------------------");
    console.log(`[DEV OTP EMAIL SENDER]`);
    console.log(`From: "Upstartica" <${GMAIL_USER}>`);
    console.log(`To: ${toEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Generated OTP: ${otp}`);
    console.log("--------------------------------------------------");
    return { success: true };
  }

  return {
    success: false,
    error: "SMTP credentials not configured on server (GMAIL_APP_PASSWORD missing).",
  };
}

export async function sendWaitlistConfirmationEmail(
  toEmail: string,
  firstName: string,
  docId: string
): Promise<{ success: boolean; error?: string }> {
  const { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } = getGmailConfig();
  const subject = `Welcome to Upstartica Waitlist - Application #${docId}`;

  const textBody = `Hi ${firstName},

Congratulations! Your registration for the Upstartica waitlist has been successfully received.

Your Application Number / Document ID is: ${docId}

Thank you for sharing your ambition with us. We will notify you first as soon as Upstartica launches.

Regards,
Team Upstartica`;

  const htmlBody = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 580px; margin: 0 auto; padding: 36px 28px; background: #f6f2ec; border-radius: 20px; color: #06183b;">
      <h2 style="margin-top: 0; color: #06183b; font-size: 24px;">Welcome to Upstartica!</h2>
      <p style="font-size: 16px; color: #4a5975; line-height: 1.6;">Hi <strong>${firstName}</strong>,</p>
      <p style="font-size: 15px; color: #4a5975; line-height: 1.6;">Your registration for the Upstartica waitlist has been confirmed and saved to our database.</p>
      
      <div style="margin: 28px 0; padding: 20px; background: #06183b; border-radius: 14px; text-align: center; color: #ffffff;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #7b93b2; display: block; margin-bottom: 6px;">Application Number / Document ID</span>
        <span style="font-size: 28px; font-weight: 900; color: #ff5a05; letter-spacing: 4px;">${docId}</span>
      </div>

      <p style="font-size: 14px; color: #52627d; line-height: 1.6;">Please keep this Application ID for your records. We will reach out to you directly when access opens.</p>
      <hr style="border: none; border-top: 1px solid rgba(6, 24, 59, 0.1); margin: 28px 0;" />
      <p style="font-size: 14px; font-weight: 700; color: #06183b; margin-bottom: 0;">Regards,<br /><span style="color: #ff5a05;">Team Upstartica</span></p>
    </div>
  `;

  if (GMAIL_APP_PASSWORD && GMAIL_APP_PASSWORD.trim() !== "") {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD.trim(),
        },
      });

      await transporter.sendMail({
        from: `"Upstartica" <${GMAIL_USER}>`,
        to: toEmail,
        subject,
        text: textBody,
        html: htmlBody,
      });

      return { success: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to send confirmation email";
      console.error("[EmailService Error]", errorMsg);
      return { success: false, error: `Email delivery failed: ${errorMsg}` };
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("--------------------------------------------------");
    console.log(`[DEV CONFIRMATION EMAIL SENDER]`);
    console.log(`From: "Upstartica" <${GMAIL_USER}>`);
    console.log(`To: ${toEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Application ID: ${docId}`);
    console.log("--------------------------------------------------");
    return { success: true };
  }

  return {
    success: false,
    error: "SMTP credentials not configured on server.",
  };
}
