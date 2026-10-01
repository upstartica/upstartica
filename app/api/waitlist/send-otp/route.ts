import { NextResponse } from "next/server";
import { generateAndStoreOtp } from "@/lib/waitlist-store";
import { sendOtpEmail } from "@/lib/email-service";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate & store OTP server-side
    const result = generateAndStoreOtp(cleanEmail);

    if (result.error) {
      return NextResponse.json(
        {
          success: false,
          message: result.error,
          cooldownSeconds: result.cooldownRemaining,
        },
        { status: 429 }
      );
    }

    // Send email via service (never return OTP in response!)
    const sendResult = await sendOtpEmail(cleanEmail, result.otp);

    if (!sendResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: sendResult.error || "Failed to send verification code. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Verification code sent to ${cleanEmail}. Please check your inbox.`,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: errorMsg },
      { status: 500 }
    );
  }
}
