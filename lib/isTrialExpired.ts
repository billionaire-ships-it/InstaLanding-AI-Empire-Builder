import { differenceInDays } from "date-fns";

export function isTrialExpired(startDate: Date, isPaid: boolean): boolean {
  if (isPaid) return false; // paid users don't expire
  const daysSinceStart = differenceInDays(new Date(), startDate);
  return daysSinceStart > 7;
}
