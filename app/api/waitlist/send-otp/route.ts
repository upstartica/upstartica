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
    const result = await generateAndStoreOtp(cleanEmail);

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
    console.error("Waitlist send-otp error:", err);
    return NextResponse.json(
      { success: false, message: "We could not send a verification code right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
