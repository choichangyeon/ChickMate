'use client';
import { TABS } from '@/constants/my-page-constants';
import { useTabStore } from '@/store/use-tab-store';
import type { Tabs } from '@/types/tab-type';
import React from 'react';

const { BOOKMARK, RESUME, HISTORY } = TABS;

const tabs = [
  {
    id: HISTORY,
    title: '면접기록',
  },
  {
    id: BOOKMARK, //@TODO: TABS에 가서 추가해 주세요. & zustand 타입에도 추가 부탁드립니다.
    title: '북마크한 채용공고',
  },
  {
    id: RESUME, //@TODO: TABS에 가서 추가해 주세요.& zustand 타입에도 추가 부탁드립니다.
    title: '내가 작성한 자소서',
  },
];

const TabButtons = () => {
  const { setTab } = useTabStore();
  const handleChangeTab = (newTab: Tabs) => setTab(newTab);
  return (
    <ul className='flex h-12 items-center justify-evenly bg-cool-gray-100'>
      {tabs.map((tab) => (
        <li key={`tab_${tab.id}`} className='text-md w-1/3 px-4 py-[14px] text-center font-bold text-cool-gray-900'>
          <button onClick={() => handleChangeTab(tab.id)}>{tab.title}(n개)</button>
        </li>
      ))}
    </ul>
  );
};

export default TabButtons;
