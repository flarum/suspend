/**
 * Calculates the days remaining until a provided date.
 */
export function calculateDaysRemaining(end: Date): number {
  return -dayjs().diff(end, 'days') + 1;
}
