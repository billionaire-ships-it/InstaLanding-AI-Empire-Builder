import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("hasSubscribed", "true", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}

