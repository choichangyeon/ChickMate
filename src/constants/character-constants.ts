export const LEVEL_EXP = [0, 100, 300, 1000];

type CharacterDescription = Record<number, { name: string }>;

type CharacterInfo = Record<string, CharacterDescription>;

export const CHARACTER_INFOMATIONS: CharacterInfo = {
  yellow: {
    1: { name: '아기 병아리' },
    2: { name: '안경 병아리' },
    3: { name: '화난 병아리' },
    4: { name: '미친 병아리' },
  },
  // 추후 확장 가능
  // green: {
  //   1: { name: '초록 병아리' },
  //   ...
  // },
};
