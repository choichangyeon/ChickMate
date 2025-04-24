export const TABS = {
  INTERVIEW_HISTORY_TAB: 'interviewHistories',
  BOOKMARK_TAB: 'userSelectedJobs',
  RESUME_TAB: 'resumes',
} as const;

const { INTERVIEW_HISTORY_TAB, BOOKMARK_TAB, RESUME_TAB } = TABS;
export const INIT_TAB_COUNTS = {
  [INTERVIEW_HISTORY_TAB]: 0,
  [BOOKMARK_TAB]: 0,
  [RESUME_TAB]: 0,
};
