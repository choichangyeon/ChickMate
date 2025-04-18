import { LEVEL_EXP } from '@/constants/character-constants';
type LevelInfo = {
  level: number;
  percent: number;
  remainingExp: number;
};

export const getLevelAndPercentage = (experience: number): LevelInfo => {
  const MAX_EXP = LEVEL_EXP[LEVEL_EXP.length - 1];

  if (experience >= MAX_EXP) {
    return {
      level: LEVEL_EXP.length,
      percent: 100,
      remainingExp: 0,
    };
  }

  let currentLevel = 1;
  for (let i = 1; i < LEVEL_EXP.length; i++) {
    if (experience < LEVEL_EXP[i]) {
      currentLevel = i;
      break;
    }
  }

  const currentLevelExp = LEVEL_EXP[currentLevel - 1];
  const nextLevelExp = LEVEL_EXP[currentLevel];

  const percentage = ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;

  return {
    level: currentLevel,
    percent: Math.min(100, Math.round(percentage)),
    remainingExp: nextLevelExp - experience,
  };
};
