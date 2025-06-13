import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // Optional: add real PayPal cancel logic here using their API
  await prisma.user.update({
    where: { email: session.user.email },
    data: { isPaid: false },
  });

  return NextResponse.json({ message: "Subscription cancelled successfully." });
}
