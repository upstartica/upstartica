import { NextResponse } from "next/server";
import crypto from "crypto";
import {
  isEmailVerifiedOnServer,
  isEmailRegisteredOnWaitlistD1,
  saveWaitlistSubmissionD1,
} from "@/lib/waitlist-store";
import { sendWaitlistConfirmationEmail } from "@/lib/email-service";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      contactNumber,
      email,
      age,
      foundationImportanceRating,
      foundationalKnowledgeRating,
      businessIdea,
      willingToLaunchIn2027,
      businessPotentialReason,
      canGiveThreeHours,
    } = body;

    if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
      return NextResponse.json(
        { success: false, message: "First name is required." },
        { status: 400 }
      );
    }

    if (!lastName || typeof lastName !== "string" || !lastName.trim()) {
      return NextResponse.json(
        { success: false, message: "Last name is required." },
        { status: 400 }
      );
    }

    const cleanPhone = String(contactNumber || "").replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, message: "Contact number must be exactly 10 numeric digits." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check Duplicate Registration in D1 Database
    const isRegistered = await isEmailRegisteredOnWaitlistD1(cleanEmail);
    if (isRegistered) {
      return NextResponse.json(
        { success: false, message: "This email address is already registered on our waitlist!" },
        { status: 409 }
      );
    }

    if (!(await isEmailVerifiedOnServer(cleanEmail))) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address has not been verified. Please verify your email before registering.",
        },
        { status: 403 }
      );
    }

    const parsedAge = Number(age);
    if (!parsedAge || !Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 100) {
      return NextResponse.json(
        { success: false, message: "Age must be a valid integer between 1 and 100." },
        { status: 400 }
      );
    }

    const rating1 = Number(foundationImportanceRating);
    if (!rating1 || rating1 < 1 || rating1 > 10) {
      return NextResponse.json(
        { success: false, message: "Please select a rating between 1 and 10 for foundation importance." },
        { status: 400 }
      );
    }

    const rating2 = Number(foundationalKnowledgeRating);
    if (!rating2 || rating2 < 1 || rating2 > 10) {
      return NextResponse.json(
        { success: false, message: "Please select a rating between 1 and 10 for foundational knowledge." },
        { status: 400 }
      );
    }

    if (!businessIdea || typeof businessIdea !== "string" || !businessIdea.trim()) {
      return NextResponse.json(
        { success: false, message: "Please describe your business idea." },
        { status: 400 }
      );
    }

    if (willingToLaunchIn2027 !== "Yes" && willingToLaunchIn2027 !== "No") {
      return NextResponse.json(
        { success: false, message: "Please select Yes or No for launching in 2027." },
        { status: 400 }
      );
    }

    if (!businessPotentialReason || typeof businessPotentialReason !== "string" || !businessPotentialReason.trim()) {
      return NextResponse.json(
        { success: false, message: "Please explain what makes your idea a good business." },
        { status: 400 }
      );
    }

    if (canGiveThreeHours !== "Yes" && canGiveThreeHours !== "No") {
      return NextResponse.json(
        { success: false, message: "Please select Yes or No for giving 3 hours daily." },
        { status: 400 }
      );
    }

    const namePrefix = firstName.trim().replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase().padEnd(3, "X");
    const randomNumber = crypto.randomInt(100000, 1000000).toString();
    const docId = `${namePrefix}${randomNumber}`;
    const submittedAt = new Date().toISOString();

    // Save directly into D1 SQLite Database
    const saveRes = await saveWaitlistSubmissionD1({
      docId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      contactNumber: cleanPhone,
      email: cleanEmail,
      age: parsedAge,
      foundationImportanceRating: rating1,
      foundationalKnowledgeRating: rating2,
      businessIdea: businessIdea.trim(),
      willingToLaunchIn2027,
      businessPotentialReason: businessPotentialReason.trim(),
      canGiveThreeHours,
    });

    if (!saveRes.success) {
      const duplicate = /already registered/i.test(saveRes.error || "");
      return NextResponse.json(
        { success: false, message: saveRes.error || "We could not save your registration right now. Please try again shortly." },
        { status: duplicate ? 409 : 500 }
      );
    }

    // Confirmation email is best-effort: the data is already saved, so never fail the request over it
    try {
      await sendWaitlistConfirmationEmail(cleanEmail, firstName.trim(), docId);
    } catch (emailErr) {
      console.error("Waitlist confirmation email failed:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "🎉 You have successfully registered for the Upstartica waitlist!",
        docId,
        applicationNumber: docId,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Waitlist register error:", err);
    return NextResponse.json(
      { success: false, message: "We could not process your registration right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
