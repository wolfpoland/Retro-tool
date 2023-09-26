import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth/src";
import { AuthService } from "@/pages/api/auth/(services)/auth.service";
import prisma from "@/utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

export const authService = new AuthService(prisma);

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
    newUser: "/",
    signOut: "/",
    verifyRequest: "/",
  },
  callbacks: {
    async signIn(params) {
      const { account, user } = params;

      if (
        !account ||
        !user ||
        !user.email ||
        !user.image ||
        !user.name ||
        !user.email
      ) {
        return false;
      }

      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async session(params) {
      const userId = params.user.id;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          sessions: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const token = user.sessions[0].sessionToken;

      return {
        user: params.session.user,
        expires: params.session.expires,
        token,
      };
    },
    async jwt(params) {
      const { token, user } = params;
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
    async redirect(params) {
      return Promise.resolve("/main/workspace");
    },
  },
};
export default NextAuth(authOptions);
