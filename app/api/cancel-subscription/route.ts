// File: app/api/cancelsubscription/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth"; // fallback-style import
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // TODO: Add real PayPal cancellation logic here if needed

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        isPaid: false,
        subscriptionId: null,
      },
    });

    return NextResponse.json({ message: "Subscription cancelled successfully." });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return NextResponse.json({ error: "Failed to cancel subscription." }, { status: 500 });
  }
}

