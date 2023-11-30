import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session.user?.email) return session;

      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!sessionUser) return session;

      session.user.id = sessionUser.id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      if (!profile) return false;

      try {
        const userExists = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email!,
              username: profile.name!.replaceAll(" ", "_").toLowerCase(),
              image: profile.image || "",
            },
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
