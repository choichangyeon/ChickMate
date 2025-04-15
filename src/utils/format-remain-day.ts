export const formatRemainDay = (date: Date): number => {
  const currentDate = new Date();
  const milliSecondsInOneDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil((date.getTime() - currentDate.getTime()) / milliSecondsInOneDay);
  return daysRemaining;
};
