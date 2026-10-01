import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import Credentials from "next-auth/providers/credentials"

/**
 * Edge-safe auth config — no Node.js-only imports (no fs, no AWS SDK, no db).
 * Used by middleware and anywhere that runs on the Edge runtime.
 * The full auth.ts extends this with the actual credential validation logic.
 */
export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
    }),
    // Credentials provider declared here without the authorize logic so it's
    // Edge-safe. The actual authorize() with R2/S3 calls lives in auth.ts.
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.includes("/learner")) return `${baseUrl}/learner`;
      if (url.includes("/mentor")) return `${baseUrl}/mentor`;
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = typeof token.role === "string" ? token.role : undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
