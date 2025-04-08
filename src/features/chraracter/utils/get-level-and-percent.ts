// utils/get-level-and-percent.ts
import { LEVEL_EXP } from '@/constants/character-constants';

export const getLevelAndPercentage = (exp: number) => {
  if (exp >= LEVEL_EXP[3]) return { level: 4, percent: 100 };
  if (exp >= LEVEL_EXP[2]) return { level: 3, percent: ((exp - LEVEL_EXP[2]) / 100) * 100 };
  if (exp >= LEVEL_EXP[1]) return { level: 2, percent: ((exp - LEVEL_EXP[1]) / 100) * 100 };
  return { level: 1, percent: (exp / 100) * 100 };
};
