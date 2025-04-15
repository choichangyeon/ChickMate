import { LEVEL_EXP } from '@/constants/character-constants';

type LevelInfo = {
  level: number;
  percent: number;
  remainingExp: number;
};

export const getLevelAndPercentage = (experience: number): LevelInfo => {
  if (experience >= LEVEL_EXP[3]) {
    return { level: 4, percent: 100, remainingExp: 0 };
  }

  if (experience >= LEVEL_EXP[2]) {
    const percent = ((experience - LEVEL_EXP[2]) / (LEVEL_EXP[3] - LEVEL_EXP[2])) * 100;
    return {
      level: 3,
      percent: Math.min(100, Math.round(percent)),
      remainingExp: LEVEL_EXP[3] - experience,
    };
  }

  if (experience >= LEVEL_EXP[1]) {
    const percent = ((experience - LEVEL_EXP[1]) / (LEVEL_EXP[2] - LEVEL_EXP[1])) * 100;
    return {
      level: 2,
      percent: Math.min(100, Math.round(percent)),
      remainingExp: LEVEL_EXP[2] - experience,
    };
  }

  const percent = (experience / (LEVEL_EXP[1] - LEVEL_EXP[0])) * 100;
  return {
    level: 1,
    percent: Math.min(100, Math.round(percent)),
    remainingExp: LEVEL_EXP[1] - experience,
  };
};
