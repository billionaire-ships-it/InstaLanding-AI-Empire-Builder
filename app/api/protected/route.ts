import { NextRequest, NextResponse } from "next/server";
import  getServerSession  from "next-auth";
import  authOptions  from "@/lib/auth";
import  prisma  from "@/lib/prisma";
import  isTrialExpired  from "@/lib/subscription";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const isTrialActive = user?.subscribedAt
    ? !isTrialExpired(new Date(user.subscribedAt), user?.isPaid)
    : false;

  if (!user?.isPaid && !isTrialActive) {
    return new NextResponse("Trial expired. Please subscribe.", { status: 403 });
  }

  return NextResponse.json({ success: true });
}

