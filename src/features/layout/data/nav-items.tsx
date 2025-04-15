import { PATH } from '@/constants/path-constant';
export type NavItems = {
  path: string;
  name: string;
  type: 'link' | 'button';
  icons?: React.ReactNode;
  class?: string;
};

const { ON_BOARDING, AUTH, MY_PAGE, RESUME, INTERVIEW, JOB } = PATH;
export const Private_Nav_Items: NavItems[] = [
  {
    path: JOB,
    type: 'link',
    name: '채용공고',
    icons: '',
    class: 'mb-2',
  },
  {
    path: RESUME.ROOT,
    type: 'link',
    name: '자소서',
    icons: '',
    class: 'mb-2',
  },
  {
    path: INTERVIEW.START,
    type: 'link',
    name: 'AI 면접',
    icons: '',
    class: 'mb-2',
  },
  {
    path: MY_PAGE,
    type: 'link',
    name: '마이페이지',
    icons: '',
  },
  {
    path: ON_BOARDING,
    type: 'button',
    name: '로그아웃',
    class: 'mt-auto',
    icons: '',
  },
];

export const Public_Nav_Items: NavItems[] = [
  {
    path: AUTH.SIGN_IN,
    name: '로그인',
    type: 'link',
    icons: '',
    class: 'mb-2',
  },
  {
    path: AUTH.SIGN_UP,
    name: '회원가입',
    type: 'link',
    icons: '',
  },
];
