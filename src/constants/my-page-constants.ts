export const TABS = {
  HISTORY: 'interviewHistories',
  BOOKMARK: 'userSelectedJobs',
  RESUME: 'resumes',
} as const;

const { HISTORY, BOOKMARK, RESUME } = TABS;
export const INIT_TAB_COUNTS = {
  [HISTORY]: 0,
  [BOOKMARK]: 0,
  [RESUME]: 0,
};
