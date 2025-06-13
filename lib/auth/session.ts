import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db"; // use your DB client

export async function getExtendedUserSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  // Fetch user data from DB including trialEnd and subscription status
  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      email: true,
      trialEnd: true,
      isPaid: true,
    },
  });

  return { ...session, user: { ...session.user, ...user } };
}
