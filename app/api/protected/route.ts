const user = await prisma.user.findUnique({ where: { email } });

if (!user) return new Response("Unauthorized", { status: 401 });

const now = new Date();
const isTrialActive = user.trialEndsAt && now <= user.trialEndsAt;

if (!user.isPaid && !isTrialActive) {
  return new Response("Trial expired. Please subscribe.", { status: 403 });
}
