import { handlers } from "@/auth"

// Force Node.js runtime — the auth handler uses R2/S3 (AWS SDK) which
// requires fs and other Node.js APIs not available on the Edge runtime.
export const runtime = "nodejs"

export const { GET, POST } = handlers
