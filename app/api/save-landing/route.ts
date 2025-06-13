export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const hasAccess = await checkUserAccess(session.user.id);

  if (!hasAccess) {
    return new Response("Trial expired or unpaid", { status: 403 });
  }


import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import LandingPage from "@/models/LandingPage";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt, html } = await req.json();

  if (!prompt || !html) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await dbConnect();

  await LandingPage.create({
    userId: session.user.email,
    prompt,
    html,
  });

  return NextResponse.json({ success: true });
}}
