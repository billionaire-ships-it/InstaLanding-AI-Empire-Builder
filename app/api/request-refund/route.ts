import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import  authOptions  from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // In a real system, you'd call PayPal refund API manually or notify you
  console.log("Refund requested for user:", session.user.email);

  return NextResponse.json({ message: "Refund request received. We’ll process it shortly." });
}
