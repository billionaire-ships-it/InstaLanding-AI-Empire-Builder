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

    const body = await req.json();
    const subscriptionId = body.subscriptionID || body.subscriptionId;

    if (!subscriptionId) {
      return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 });
    }

    // Update user in the DB
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        isPaid: true,
        subscriptionActive: true,
        subscriptionId,
        subscriptionActivatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Subscription confirmed and access granted" });
  } catch (error) {
    console.error("Error confirming subscription:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
