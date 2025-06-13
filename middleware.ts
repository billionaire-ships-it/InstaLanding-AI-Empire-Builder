import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { isTrialExpired } from "@/lib/subscription";

const PROTECTED_PATHS = ["/dashboard", "/ai", "/tools"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  if (!token || !token.email || !PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  const trialOver = isTrialExpired(user?.subscribedAt || undefined, user?.isPaid);

  if (trialOver) {
    const url = req.nextUrl.clone();
    url.pathname = "/paywall";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/ai/:path*", "/tools/:path*"],
};





