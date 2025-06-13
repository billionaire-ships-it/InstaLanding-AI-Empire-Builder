// File: app/api/paypal/confirm-subscription/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subscriptionID } = await req.json();
    if (!subscriptionID) {
      return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 });
    }

    // Update user record in the database
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        subscriptionActive: true,
        subscriptionId: subscriptionID,
        subscriptionActivatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Subscription confirmed" });
  } catch (error) {
    console.error("Error confirming subscription:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { subscriptionId } = await req.json();

  if (!session?.user?.email || !subscriptionId) {
    return NextResponse.json({ error: "Unauthorized or invalid" }, { status: 401 });
  }

  // ✅ Set isPaid = true in the DB
  await db.user.update({
    where: { email: session.user.email },
    data: {
      isPaid: true,
      subscriptionId,
    },
  });

  return NextResponse.json({ success: true });
}

