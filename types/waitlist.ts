export type WaitlistStep = 1 | 2 | 3; // Step 1: Personal Info + OTP, Step 2: Business Info, Step 3: Success

export type WaitlistFormData = {
  // Step 1: Personal Info
  firstName: string;
  lastName: string;
  contactNumber: string; // 10 digits
  email: string;
  otp: string; // 4 digits
  emailVerified: boolean;

  // Step 2: Business & Entrepreneurship Info
  age: string; // 1 - 100
  foundationImportanceRating: number | null; // 1 - 10
  foundationalKnowledgeRating: number | null; // 1 - 10
  businessIdea: string;
  willingToLaunchIn2027: "Yes" | "No" | "";
  businessPotentialReason: string;
  canGiveThreeHours: "Yes" | "No" | "";
};

export type SendOtpRequest = {
  email: string;
};

export type SendOtpResponse = {
  success: boolean;
  message: string;
  cooldownSeconds?: number;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type VerifyOtpResponse = {
  success: boolean;
  message: string;
  verified?: boolean;
};

export type RegisterWaitlistRequest = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  age: number;
  foundationImportanceRating: number;
  foundationalKnowledgeRating: number;
  businessIdea: string;
  willingToLaunchIn2027: "Yes" | "No";
  businessPotentialReason: string;
  canGiveThreeHours: "Yes" | "No";
};

export type RegisterWaitlistResponse = {
  success: boolean;
  message: string;
  docId?: string;
  applicationNumber?: string;
};
