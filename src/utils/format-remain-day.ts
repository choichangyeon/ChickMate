export const formatRemainDay = (date: Date): number | null => {
  try {
    const currentDate = new Date();
    const MILLISECONDS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.ceil((date.getTime() - currentDate.getTime()) / MILLISECONDS_IN_ONE_DAY);
    return daysRemaining;
  } catch (error) {
    return null;
  }
};
