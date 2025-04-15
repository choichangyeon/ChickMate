import { ChatAlt2Fill } from '@/components/icons/chat-alt-2-fill';
import { FileDockFill } from '@/components/icons/file-dock-fill';
import FileDockSearchFill from '@/components/icons/file-dock-search-fill';
import { PATH } from '@/constants/path-constant';

export type OnBoardingCard = {
  title: string;
  content: string;
  icon: JSX.Element;
  path: string;
};
const { RESUME, INTERVIEW, JOB } = PATH;
export const onBoardingList: OnBoardingCard[] = [
  {
    title: '자소서 작성하기',
    content: `AI 면접은 자소서가 있어야 시작할 수 있어요.\n지금 바로 당신의 이야기를 적어보세요!`,
    icon: <FileDockFill />,
    path: RESUME.ROOT,
  },
  {
    title: 'AI 면접 진행하기',
    content: `압박 면접, ChickMate와 함께라면 두렵지 않아요.\n실전 면접 전에 이건 필수 코스!`,
    icon: <ChatAlt2Fill />,
    path: INTERVIEW.START,
  },
  {
    title: '맞춤형 채용공고 확인하기',
    content: `내 이력을 기반으로 한 찐 맞춤형 공고를\nChickMate가 쏙쏙 추천해 드릴게요.`,
    icon: <FileDockSearchFill />,
    path: JOB,
  },
];
