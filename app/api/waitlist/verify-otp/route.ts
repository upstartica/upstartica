import { NextResponse } from "next/server";
import { verifyOtpCode } from "@/lib/waitlist-store";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!otp || typeof otp !== "string" || !/^\d{4}$/.test(otp.trim())) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 4-digit verification code." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    const result = verifyOtpCode(cleanEmail, cleanOtp);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: result.error || "Verification failed. Please try again.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        verified: true,
        message: "Email address verified successfully!",
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
