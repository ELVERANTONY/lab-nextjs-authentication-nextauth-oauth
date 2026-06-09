import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { findUserByEmail, updateUser } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = findUserByEmail(credentials.email);

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        // Check for lockout
        if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
          throw new Error("Account is locked. Try again later.");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          const newAttempts = user.failedLoginAttempts + 1;
          let lockedUntil = null;
          
          if (newAttempts >= 3) {
            // Lock for 15 minutes
            lockedUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
          }

          updateUser(user.email, { failedLoginAttempts: newAttempts, lockedUntil });

          if (lockedUntil) {
             throw new Error("Too many failed attempts. Account locked for 15 minutes.");
          }
          throw new Error("Invalid password");
        }

        // Reset failed attempts on successful login
        if (user.failedLoginAttempts > 0) {
           updateUser(user.email, { failedLoginAttempts: 0, lockedUntil: null });
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
