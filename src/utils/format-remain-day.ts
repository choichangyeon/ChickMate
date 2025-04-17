/**
 *
 * @param {Date} - 날짜 데이터
 * @returns {number | null} - 현재 날짜와 비교하여 D-day를 표시 오류가 났을 때는 null return
 */
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
