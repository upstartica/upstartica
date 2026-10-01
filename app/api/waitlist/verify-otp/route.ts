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

    const result = await verifyOtpCode(cleanEmail, cleanOtp);

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
    console.error("Waitlist verify-otp error:", err);
    return NextResponse.json(
      { success: false, message: "We could not verify your code right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
