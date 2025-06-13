export function isTrialActive(activatedAt: Date): boolean {
  const now = new Date();
  const trialEndsAt = new Date(activatedAt);
  trialEndsAt.setDate(trialEndsAt.getDate() + 7);
  return now < trialEndsAt;
}
