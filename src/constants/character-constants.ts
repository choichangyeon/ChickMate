export const LEVEL_EXP = [0, 100, 300, 1000];

export const CHARACTER_INFO = {
  yellow: {
    1: { name: '노란 병아리' },
    2: { name: '노란 병아리' },
    3: { name: '노란 병아리' },
    4: { name: '노란 병아리' },
  },
  //   추후 캐릭터 타입 추가될 경우
  //   green: {
  //     1: { name: '초록 병아리' },
  //     2: { name: '초록 병아리' },
  //     3: { name: '초록 병아리' },
  //     4: { name: '초록 병아리' },
  //   },
};

export type CharacterType = keyof typeof CHARACTER_INFO;
