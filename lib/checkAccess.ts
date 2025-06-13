import { prisma } from "./db";

export async function checkUserAccess(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) return false;

  const now = new Date();
  const trialActive = user.trialEndsAt && now <= user.trialEndsAt;
  return user.isPaid || trialActive;
}
