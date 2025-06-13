import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { subscriptionId } = await req.json();
  if (!subscriptionId) {
    return NextResponse.json({ error: "Missing subscription ID" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      isPaid: true,
      subscriptionId,
    },
  });

  return NextResponse.json({ success: true });
}
