'use client';
import { TABS } from '@/constants/my-page-constants';
import { useTabStore } from '@/store/use-tab-store';
import InterviewHistoryList from '@/features/interview-history/interview-history-list';
import BookmarkHistoryList from '@/features/bookmark-history/bookmark-history-list';

const { HISTORY, BOOKMARK, RESUME } = TABS;

const ListByTab = () => {
  const { tab } = useTabStore();
  switch (tab) {
    case HISTORY:
      return <InterviewHistoryList />;
    case BOOKMARK:
      return <BookmarkHistoryList />;
    case RESUME:
      return <div>자소서 컴포넌트 연결</div>;
    default:
      <InterviewHistoryList />;
  }
};

export default ListByTab;
