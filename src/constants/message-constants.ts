export const AUTH_MESSAGE = {
  VALIDATION: {
    NAME_LENGTH: '이름은 2~8자여야 합니다.',
    NAME_SPECIAL_CHAR: '이름에는 특수 문자를 포함할 수 없습니다.',
    EMAIL_INVALID: '올바른 이메일 형식이어야 합니다.',
    PASSWORD_LENGTH: '비밀번호는 6자 이상이어야 합니다.',
    PASSWORD_SPECIAL_CHAR: '비밀번호는 최소 하나의 특수 문자를 포함해야 합니다.',
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
};
