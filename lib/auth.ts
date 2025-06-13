// lib/auth.ts
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "./mongodb";
import User from "../models/User";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          // Return null for invalid login instead of throwing
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;async; signIn({ user }) ;{
  const existingUser = await prisma.user.findUnique({ where: { email: user.email! } });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: user.email!,
        name: user.name,
        image: user.image,
        isPaid: false,
        subscribedAt: new Date(), // Start trial
      },
    });
  }

  return true;
}
