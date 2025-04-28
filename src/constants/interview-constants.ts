export const INTERVIEW_TYPE = {
  PRESSURE: 'pressure',
  CALM: 'calm',
} as const;

export const INTERVIEW_TYPE_KR = {
  PRESSURE_KR: '불타는 면접관',
  CALM_KR: '햇살 면접관',
} as const;

export const INTERVIEW_LIMIT_COUNT = 8;

// 면접 완료 상태
export const INTERVIEW_HISTORY_STATUS = {
  PENDING: 0, // 면접을 시작함 (면접 시작 시 바로 이 상태가 됨)
  COMPLETED: 1, // 면접을 끝까지 완료함
  IN_PROGRESS: 2, // 면접 진행 중
};

export const INTERVIEW_HISTORY_BADGE = {
  DONE: '면접 완료',
  NOT_DONE: '면접 보기 전',
};
