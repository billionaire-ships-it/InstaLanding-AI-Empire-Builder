// File: lib/subscription.ts

export function isTrialExpired(subscribedAt?: Date, isPaid?: boolean) {
  if (isPaid) return false;
  if (!subscribedAt) return true;

  const trialEnd = new Date(subscribedAt);
  trialEnd.setDate(trialEnd.getDate() + 7);
  return new Date() > trialEnd;
}
