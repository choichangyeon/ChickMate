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
  },
  AI: {
    STT: '/api/ai/stt',
    TTS: '/api/ai/tts',
    INTERVIEW: '/api/ai/interview',
  },
  RESUME: {
    SUBMIT: `/api/resume/submit`,
    SUBMIT_DETAIL: (id: number) => `/api/resume/submit/${id}`,
    DRAFT: `/api/resume/draft`,
    DRAFT_DETAIL: (id: number) => `/api/resume/draft/${id}`,
  },
  USER: {
    META_DATA: '/api/user-meta-data',
  },
  REGIONS: '/api/regions',
  JOB: {
    POSTING: '/api/job/posting',
  },
};
