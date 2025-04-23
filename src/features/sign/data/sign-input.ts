export const SIGN_UP_INPUT = [
  {
    label: 'NAME',
    id: 'name',
    type: 'text',
    placeholder: '2~8자 사이로 닉네임을 입력해주세요.',
  },
  {
    label: 'EMAIL',
    id: 'email',
    type: 'text',
    placeholder: '이메일을 입력해주세요.',
  },
  {
    label: 'PASSWORD',
    id: 'password',
    type: 'password',
    placeholder: '6자 이상의 비밀번호를 입력해주세요.',
  },
  {
    label: 'PASSWORD CHECK',
    id: 'passwordCheck',
    type: 'password',
    placeholder: '비밀번호를 확인해주세요.',
  },
] as const;

export const SIGN_IN_INPUT = [
  {
    label: 'EMAIL',
    id: 'email',
    type: 'text',
    placeholder: '이메일을 입력해주세요.',
  },
  {
    label: 'PASSWORD',
    id: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요.',
  },
] as const;
