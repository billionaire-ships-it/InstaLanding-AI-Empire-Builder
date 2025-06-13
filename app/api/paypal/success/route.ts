// /app/api/paypal/success/route.ts

import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Update user to mark as paid
  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      isPaid: true,
    },
  });

  return NextResponse.json({ success: true });
}
