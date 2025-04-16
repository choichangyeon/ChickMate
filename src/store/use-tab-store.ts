import { TABS } from '@/constants/my-page-constants';
import type { Tabs } from '@/types/tab-type';
import { create } from 'zustand';
const { HISTORY } = TABS;
type Tab = Tabs;
type TabState = {
  tab: Tab;
  setTab: (newTab: Tab) => void;
  resetTab: () => void;
};

const initialState = {
  tab: HISTORY,
};

export const useTabStore = create<TabState>()((set) => ({
  tab: initialState.tab,
  setTab: (newTab: Tab) => set({ tab: newTab }),
  resetTab: () => set({ tab: initialState.tab }),
}));
