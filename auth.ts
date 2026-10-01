import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { findUserByEmail } from "@/lib/r2"
import { authConfig } from "./auth.config"

class CustomAuthError extends CredentialsSignin {
  code = "custom_error"
  constructor(message: string) {
    super(message);
    this.message = message;
    this.code = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    // Spread the Edge-safe providers from authConfig, then override Credentials
    // with the full authorize() implementation that uses R2/S3 (Node.js only).
    ...authConfig.providers.filter(
      (p) => (p as { id?: string }).id !== "credentials"
    ),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new CustomAuthError("Missing email or password");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await findUserByEmail(email);

        if (!user) {
          throw new CustomAuthError("User not registered and Sign up first");
        }

        if (user.password !== password) {
          throw new CustomAuthError("Invalid credentials");
        }

        return {
          id: user.email,
          email: user.email,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email,
          role: user.role,
          image: user.image ?? null,
        };
      },
    }),
  ],
})
