import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identity: { label: "identity", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identity || !credentials?.password) {
          throw new Error("Invalid credential");
        }

        const user = await prisma.user
          .findFirst({
            where: {
              OR: [
                {
                  email: credentials.identity,
                },
                {
                  username: credentials.identity,
                },
              ],
            },
          })
          .catch((err) => err);

        if (user?.code) {
          throw new Error("Please try again");
        }

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid identifier");
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error("Password is incorrect");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.username = user.username;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.username = token.username;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
