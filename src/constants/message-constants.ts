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
    SOCIAL_SIGN_IN_EXIST_ERROR: '다른 로그인 방식으로 이미 가입된 계정이에요.',
    SOCIAL_SIGN_IN_FAILED: '소셜 로그인에 실패했어요. 다시 시도해 주세요.',
    AUTH_REQUIRED: '사용자 인증이 필요합니다.',
  },
  ERROR: {
    EXPIRED_TOKEN: '토큰이 만료되었습니다. 다시 로그인해 주세요.',
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
  SUBMIT: {
    REQUEST_FAILURE: '유효하지 않은 자기소개서 양식입니다.',
    SUBMIT_SERVER_ERROR: '자기소개서 생성에 실패했습니다.',
  },
  DRAFT: {
    NOT_FOUND: '해당 자소서를 찾을 수 없습니다.',
    FORBIDDEN: '해당 자기소개서를 수정할 권한이 없습니다.',
    DRAFT_SERVER_ERROR: '자기소개서 임시 저장에 실패하였습니다.',
  },
  NOT_FOUND: '해당 자소서를 찾을 수 없습니다.',
  GET_SERVER_ERROR: '자기소개서를 가져오는데 실패했습니다.',
  DELETE_REQUEST_SUCCESS: '자기소개서가 삭제되었습니다.',
  DELETE_SERVER_ERROR: '자기소개서를 삭제하는데 실패했습니다.',
  DELETE_FORBIDDEN: '해당 자기소개서를 삭제할 권한이 없습니다.',
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
    DB_URL_ERROR: 'DB URL 에러',
  },
  VALIDATION: {
    USER_ID_VALIDATION: '유저 아이디가 유효하지 않습니다.',
    JOB_POSTING_ID_VALIDATION: '채용 공고 아이디가 유효하지 않습니다.',
  },
};

export const CHARACTER_MESSAGE = {
  INFO: {
    GET_DATA_FAILED: '캐릭터 정보를 가져오는데 실패했습니다.',
  },
  PATCH: {
    PATCH_DATA_FAILED: '경험치 획득에 실패했습니다.',
  },
};
