'use client';

import { TABS } from '@/constants/my-page-constants';
import BookmarkSelectedList from '@/features/bookmark-selected/bookmark-selected-list';
import InterviewHistoryList from '@/features/interview-history/interview-history-list';
import ResumeList from '@/features/resume-list/resume-list';
import { useSearchParams } from 'next/navigation';

const { INTERVIEW_HISTORY_TAB, BOOKMARK_TAB, RESUME_TAB } = TABS;

const ListByTab = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') ?? INTERVIEW_HISTORY_TAB;

  switch (currentTab) {
    case INTERVIEW_HISTORY_TAB:
      return <InterviewHistoryList />;
    case BOOKMARK_TAB:
      return <BookmarkSelectedList />;
    case RESUME_TAB:
      return <ResumeList />;
    default:
      <InterviewHistoryList />;
  }
};

export default ListByTab;
