/**
 * Tanstack Query에서 사용하는 Stale Time 상수
 */
export const STALE_TIME = {
  MIN: 1000 * 60,
  AN_HOUR: 1000 * 60 * 60,
  A_DAY: 1000 * 60 * 60 * 24,
};

export const GC_TIME = {
  SAMPLE: 10,
};

export const DELAY_TIME = {
  DEFAULT: 2000,
};

export const REFETCH_TIME = {
  MIN: 1000 * 60,
};
