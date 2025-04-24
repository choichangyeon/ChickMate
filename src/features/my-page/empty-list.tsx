import { TABS } from '@/constants/my-page-constants';

const { BOOKMARK_TAB, RESUME_TAB, INTERVIEW_HISTORY_TAB } = TABS;
const EMPTY_MESSAGE: Record<string, string> = {
  [INTERVIEW_HISTORY_TAB]: `면접 결과가 없습니다.
  면접을 먼저 진행해 주세요.`,
  [BOOKMARK_TAB]: `북마크 된 채용 공고가 없습니다.
  채용공고 페이지에서 원하는 내용을 찾아보세요.`,
  [RESUME_TAB]: `아직 작성된 이력서가 없습니다.`,
};

type Props = {
  tab: (typeof TABS)[keyof typeof TABS];
};

const EmptyList = ({ tab }: Props) => {
  return <div className='whitespace-pre-line text-center text-cool-gray-500'>{EMPTY_MESSAGE[tab]}</div>;
};

export default EmptyList;
