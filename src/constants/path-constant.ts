export const PATH = {
  MAIN: '/',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    CHARACTER: '/auth/character',
  },
  ON_BOARDING: '/on-boarding',
  MY_PAGE: '/my-page',
  RESUME: {
    ROOT: '/resume',
    DETAIL: (id: number) => `/resume/${id}`,
  },
};

export const ROUTE_HANDLER_PATH = {
  AUTH: {
    SIGN_UP: '/api/sign-up',
    SIGN_IN: '/api/auth/sign-in',
  },
  AI: {
    STT: '/api/ai/stt',
    TTS: '/api/ai/tts',
    INTERVIEW: '/api/ai/interview',
  },
  RESUME: {
    SUBMIT: `/api/resume/submit`,
    DRAFT: `/api/resume/draft`,
  },
  USER: {
    META_DATA: '/api/user-meta-data',
  },
  REGIONS: '/api/regions',
  JOB: {
    POSTING: '/api/job/posting',
  },
  CHARACTER: {
    INFO: '/api/character',
    EXPERIENCE: '/api/character/experience',
  },
};
