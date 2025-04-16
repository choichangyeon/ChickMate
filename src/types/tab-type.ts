import { TABS } from '@/constants/my-page-constants';

const { HISTORY, BOOKMARK, RESUME } = TABS;
export type Tabs = typeof HISTORY | typeof BOOKMARK | typeof RESUME;
