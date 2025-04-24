import { TABS } from '@/constants/my-page-constants';

const { INTERVIEW_HISTORY_TAB, BOOKMARK_TAB, RESUME_TAB } = TABS;
export type Tabs = typeof INTERVIEW_HISTORY_TAB | typeof BOOKMARK_TAB | typeof RESUME_TAB;
