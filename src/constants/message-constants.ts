import { USER_META_DATA_KEY } from './user-meta-data-constants';

export const AUTH_MESSAGE = {
  VALIDATION: {
    NAME_LENGTH: '이름은 2~8자여야 합니다.',
    NAME_SPECIAL_CHAR: '이름에는 특수 문자를 포함할 수 없습니다.',
    EMAIL_INVALID: '올바른 이메일 형식이어야 합니다.',
    PASSWORD_LENGTH: '비밀번호는 6자 이상이어야 합니다.',
    PASSWORD_SPECIAL_CHAR: '비밀번호는 최소 하나의 특수 문자를 포함해야 합니다.',
    PASSWORD_CHECK: '비밀번호가 일치하지 않습니다.',
    EMAIL_EMPTY_FIELD: '이메일을 입력해주세요.',
    PASSWORD_EMPTY_FIELD: '비밀번호를 입력해주세요.',
  },
  RESULT: {
    SIGN_UP_SUCCESS: '회원 가입에 성공했습니다.',
    SIGN_UP_FAILED: '회원 가입에 실패했습니다.',
    SIGN_UP_EXIST_ERROR: '이미 존재하는 이메일입니다.',
    SIGN_UP_EMPTY_FIELD: '모든 값을 입력해주세요.',
    SIGN_IN_SUCCESS: '로그인에 성공했습니다.',
    SIGN_IN_FAILED: '이메일 혹은 비밀번호를 확인해주세요.',
    AUTH_REQUIRED: '사용자 인증이 필요합니다.',
  },
};

export const AI_MESSAGE = {
  TTS: {
    REQUEST_FAILURE: 'TTS 요청 실패',
    SERVER_ERROR: 'TTS 서버 에러',
  },
  STT: {
    SERVER_ERROR: 'STT 서버 에러',
    NOT_FILE: '파일이 제공되지 않았습니다.',
  },
  AI: {
    AI_REQUEST_FAILURE: 'AI 요청 실패',
    AI_SERVER_ERROR: 'AI 서버 에러',
  },
};

export const RESUME_MESSAGE = {
  SUBMIT: { REQUEST_FAILURE: '유효하지 않은 자기소개서 양식입니다.', SERVER_ERROR: '자기소개서 생성에 실패했습니다.' },
  DRAFT: {
    REQUEST_FAILURE: '',
    SERVER_ERROR: '',
  },
};

const { TYPE, EDUCATION, JOB, MAIN_REGION } = USER_META_DATA_KEY;
export const USER_META_DATA_FORM_MESSAGE = {
  VALIDATION: {
    [TYPE]: '경력을 선택해 주세요.',
    [EDUCATION]: '학력을 선택해 주세요.',
    [JOB]: '직종을 선택해 주세요.',
    [MAIN_REGION]: '지역을 선택해 주세요.',
  } as const,
  API: {
    GET_REGIONS_ERROR: '지역 정보를 가져오는데 실패했습니다.',
    GET_DATA_ERROR: '유저 정보를 가져오는데 실패했습니다.',
    POST_DATA_ERROR: '유저 정보를 저장하는데 실패했습니다.',
  },
};

export const DB_MESSAGE = {
  ERROR: {
    DB_REQUEST_ERROR: 'DB 서버 요청 에러',
    DB_SERVER_ERROR: 'DB 서버 에러',
  },
};
