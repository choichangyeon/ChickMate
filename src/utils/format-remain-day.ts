export const formatRemainDay = (date: Date): number | null => {
  try {
    const currentDate = new Date();
    const milliSecondsInOneDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.ceil((date.getTime() - currentDate.getTime()) / milliSecondsInOneDay);
    return daysRemaining;
  } catch (error) {
    return null;
  }
};
