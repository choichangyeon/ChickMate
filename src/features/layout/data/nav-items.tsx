import InterviewIcon from '@/components/icons/interview-icon';
import JobIcon from '@/components/icons/job-icon';
import MyPageIcon from '@/components/icons/my-page-icon';
import ResumeIcon from '@/components/icons/resume-icon';
import SignInIcon from '@/components/icons/sign-in-icon';
import LogoutIcon from '@/components/icons/logout-icon';
import { PATH } from '@/constants/path-constant';
import InterviewFullIcon from '@/components/icons/interview-full-icon';
import JobFullIcon from '@/components/icons/job-full-icon';
import MyPageFullIcon from '@/components/icons/my-page-full-icon';
import ResumeFullIcon from '@/components/icons/resume-full-icon';

export type NavItems = {
  path: string;
  name: string;
  type: 'link' | 'button';
  icon?: React.ReactNode;
  fullIcon?: React.ReactNode;
  class?: string;
};

const { ON_BOARDING, AUTH, MY_PAGE, RESUME, INTERVIEW, JOB } = PATH;

const Nav_Items = [
  {
    path: RESUME.ROOT,
    type: 'link',
    name: '자소서',
    icon: <ResumeIcon />,
    fullIcon: <ResumeFullIcon />,
    class: 'mb-2 mobile:m-0',
  },
  {
    path: INTERVIEW.START,
    type: 'link',
    name: 'AI 면접',
    icon: <InterviewIcon />,
    fullIcon: <InterviewFullIcon />,
    class: 'mb-2 mobile:m-0',
  },
  {
    path: JOB,
    type: 'link',
    name: '맞춤 채용 공고',
    icon: <JobIcon />,
    fullIcon: <JobFullIcon />,
    class: 'mb-2 mobile:m-0',
  },
  {
    path: MY_PAGE,
    type: 'link',
    name: '마이페이지',
    icon: <MyPageIcon />,
    fullIcon: <MyPageFullIcon />,
  },
] as const;

export const Private_Nav_Items: NavItems[] = [
  ...Nav_Items,
  {
    path: ON_BOARDING,
    type: 'button',
    name: '로그아웃',
    class: 'mt-auto mobile:m-0 h-[36px]',
    icon: <LogoutIcon />,
  },
];

export const Public_Nav_Items: NavItems[] = [
  ...Nav_Items,
  {
    path: AUTH.SIGN_IN,
    name: '로그인',
    type: 'link',
    class: 'mt-auto mobile:m-0',
    icon: <SignInIcon />,
  },
];
