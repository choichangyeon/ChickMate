// TODO: 제가 임의로 넣어둔 부분이라 나중에 수정해주시면 됩니다!

export const LEVEL_EXP = [0, 100, 300, 1000, 2000, 10000];

type CharacterDescription = Record<number, { name: string }>;

type CharacterInfo = Record<string, CharacterDescription>;

export const CHARACTER_INFOMATIONS: CharacterInfo = {
  // yellow: {
  //   1: { name: '아기 병아리' },
  //   2: { name: '안경 병아리' },
  //   3: { name: '화난 병아리' },
  //   4: { name: '미친 병아리' },
  // },
  clay: {
    1: { name: '알 (클레이)' },
    2: { name: '학생 병아리' },
    3: { name: '백수 병아리' },
    4: { name: '안경 병아리' },
    5: { name: '정장 병아리' },
    6: { name: '불닭 병아리' },
  },
  poly: {
    1: { name: '알 (로우폴리)' },
    2: { name: '학생 병아리' },
    3: { name: '백수 병아리' },
    4: { name: '안경 병아리' },
    5: { name: '정장 병아리' },
    6: { name: '불닭 병아리' },
  },
  // 추후 확장 가능
  // green: {
  //   1: { name: '초록 병아리' },
  //   ...
  // },
};

export const CHARACTER_HISTORY_KEY = {
  LOGIN: 'LOGIN',
  RESUME_SUBMISSION: 'RESUME_SUBMISSION',
  INTERVIEW_COMPLETION: 'INTERVIEW_COMPLETION',
  JOB_BOOKMARK: 'JOB_BOOKMARK',
  // 테스트용
  GENERAL_HISTORY: 'GENERAL_HISTORY',
} as const;

export const CHARACTER_HISTORY_KOR = {
  LOGIN: '로그인',
  RESUME_SUBMISSION: '자소서 작성 완료',
  INTERVIEW_COMPLETION: '면접 완료',
  JOB_BOOKMARK: '채용공고 북마크',
  // 테스트용
  GENERAL_HISTORY: '테스트용 히스토리',
};

const { LOGIN, RESUME_SUBMISSION, INTERVIEW_COMPLETION, JOB_BOOKMARK, GENERAL_HISTORY } = CHARACTER_HISTORY_KEY;

export const CHARACTER_HISTORY = {
  [LOGIN]: { amount: 10 },
  [RESUME_SUBMISSION]: { amount: 50 },
  [INTERVIEW_COMPLETION]: { amount: 80 },
  [JOB_BOOKMARK]: { amount: 5 },
  // 테스트용
  [GENERAL_HISTORY]: { amount: 10 },
} as const;
