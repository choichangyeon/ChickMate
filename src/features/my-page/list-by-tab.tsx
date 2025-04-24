'use client';

import { TABS } from '@/constants/my-page-constants';
import BookmarkSelectedList from '@/features/bookmark-selected/bookmark-selected-list';
import InterviewHistoryList from '@/features/interview-history/interview-history-list';
import ResumeList from '@/features/resume-list/resume-list';
import { useSearchParams } from 'next/navigation';

const { HISTORY, BOOKMARK, RESUME } = TABS;

const ListByTab = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') ?? HISTORY;

  switch (currentTab) {
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
