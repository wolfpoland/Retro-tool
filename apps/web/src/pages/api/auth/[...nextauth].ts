import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { SessionStrategy } from "next-auth/src/core/types";
import { AuthOptions } from "next-auth/src";
import { AuthService } from "@/pages/api/auth/(services)/auth.service";
import prisma from "@/utils/prisma";
import { User } from "@prisma/client";

export const authService = new AuthService(prisma);

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
  },
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

      if (account.provider === "google") {
        const userId = user.id;
        const userPrisma: User | null = await authService.getUser(userId);

        if (!userPrisma) {
          authService.createUserFromExternalProvider({
            externalId: userId,
            avatar: user.image,
            name: user.name,
            email: user.email ?? "",
          });
        }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async session(params) {
      console.log(params);

      if (!params.token.id) {
        throw new Error("Token id not found");
      }

      const user: User | null = await authService.getUser(
        params.token.id as string
      );

      if (!user) {
        throw new Error("User not found");
      }

      return {
        user: params.session.user,
        expires: params.session.expires,
        token: params.token,
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
