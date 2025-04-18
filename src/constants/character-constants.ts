// ############## 캐릭터 경험치 획득 조건 ###############
// 캐릭터 생성 : +1,000
// 처음 내 정보 입력 : +500 (최초 1번)
// 면접 완료 : + 300 (여러번 가능)
// 자소서 완성 : + 300 (하루 최대 3개 작성 가능)
// 채용 공고 페이지 접속 : +100 (하루 최대 5번 가능)
// ############## 레벨업 기준 ###############
// Lv1 → Lv2	1,500	+1,500
// Lv2 → Lv3	3,000	+1,500
// Lv3 → Lv4	5,000	+2,000
// Lv4 → Lv5	8,000	+3,000
// Lv5 → Lv6	12,000	+4,000
// Lv6 → Lv7	20,000	+8,000
// #################################################

type CharacterDescription = Record<number, { name: string }>;
type CharacterInfo = Record<string, CharacterDescription>;

export const LEVEL_EXP = [0, 1500, 3000, 5000, 8000, 15000]; //@TODO: 추후 더 고민해 볼 예정 (레벨 7이었는데 6으로 바뀌어서 급하게 수정했기 때문..)

export const CHARACTER_INFORMATION: CharacterInfo = {
  clay: {
    1: { name: '칰칰이 알' },
    2: { name: '학생 칰칰' },
    3: { name: '백수 칰칰' },
    4: { name: '안경잽이 칰칰' },
    5: { name: '불닭' }, //@TODO: 이미지 추가되면 수정 예정
    6: { name: '성공한 칰칰' }, //@TODO: 이미지 추가되면 수정 예정
  },
  poly: {
    1: { name: '칰칰이 알' },
    2: { name: '학생 칰칰' },
    3: { name: '백수 칰칰' },
    4: { name: '안경잽이 칰칰' },
    5: { name: '불닭' }, //@TODO: 이미지 추가되면 수정 예정
    6: { name: '성공한 칰칰' }, //@TODO: 이미지 추가되면 수정 예정
  },
};

export const CHARACTER_HISTORY_KEY = {
  LOGIN: 'LOGIN',
  CREATE_CHARACTER: 'CREATE_CHARACTER', //캐릭터 생성
  RESUME_SUBMISSION: 'RESUME_SUBMISSION', // 이력서 제출
  INTERVIEW_COMPLETION: 'INTERVIEW_COMPLETION', // 면접 완료
  // JOB_BOOKMARK: 'JOB_BOOKMARK',
  FILL_OUT_META_DATA: 'FILL_OUT_META_DATA', // 유저 정보 작성
  MOVE_TO_JOB_URL: 'MOVE_TO_JOB_URL', // 채용 공고 url로 이동
  // 테스트용
  GENERAL_HISTORY: 'GENERAL_HISTORY',
} as const;

export const CHARACTER_HISTORY_KOR = {
  LOGIN: '로그인',
  CREATE_CHARACTER: '캐릭터 생성',
  RESUME_SUBMISSION: '자소서 작성 완료',
  INTERVIEW_COMPLETION: '면접 완료',
  // JOB_BOOKMARK: '채용공고 북마크',
  FILL_OUT_META_DATA: '유저 정보 최초 작성',
  MOVE_TO_JOB_URL: '채용 공고 페이지 이동',
  // 테스트용
  GENERAL_HISTORY: '테스트용 히스토리',
};

const {
  LOGIN,
  CREATE_CHARACTER,
  RESUME_SUBMISSION,
  INTERVIEW_COMPLETION,
  FILL_OUT_META_DATA,
  MOVE_TO_JOB_URL,
  GENERAL_HISTORY,
} = CHARACTER_HISTORY_KEY;

export const CHARACTER_HISTORY = {
  [CREATE_CHARACTER]: { amount: 1000 },
  [RESUME_SUBMISSION]: { amount: 300 },
  [INTERVIEW_COMPLETION]: { amount: 300 },
  // [JOB_BOOKMARK]: { amount: 5 },
  [FILL_OUT_META_DATA]: { amount: 500 },
  [MOVE_TO_JOB_URL]: { amount: 100 },
  // 테스트용
  [GENERAL_HISTORY]: { amount: 10 },
} as const;
