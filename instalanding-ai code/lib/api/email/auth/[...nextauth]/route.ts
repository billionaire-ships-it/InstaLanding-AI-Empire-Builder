// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

const handler = NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: "smtp.yourdomain.com",
        port: 587,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.RESEND_API_KEY // or SMTP password
        }
      },
      from: process.env.EMAIL_FROM,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
