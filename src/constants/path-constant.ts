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
  RESUME: `/api/resume`,
};
