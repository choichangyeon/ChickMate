'use client';

import { TABS } from '@/constants/my-page-constants';
import { useTabStore } from '@/store/use-tab-store';
import InterviewHistoryList from '@/features/interview-history/interview-history-list';
import BookmarkSelectedList from '@/features/bookmark-selected/bookmark-selected-list';
import ResumeList from '../resume-list/resume-list';

const { HISTORY, BOOKMARK, RESUME } = TABS;

const ListByTab = () => {
  const { tab } = useTabStore();
  switch (tab) {
    case HISTORY:
      return <InterviewHistoryList />;
    case BOOKMARK:
      return <BookmarkSelectedList />;
    case RESUME:
      return <ResumeList />;
    default:
      <InterviewHistoryList />;
  }
};

export default ListByTab;
