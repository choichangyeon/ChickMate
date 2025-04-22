'use client';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useTabStore } from '@/store/use-tab-store';
import { useTabCountQuery } from '@/features/my-page/hook/use-tab-count-query';
import Badge from '@/components/ui/badge';
import type { Tabs } from '@/types/tab-type';
import { TABS } from '@/constants/my-page-constants';

const { BOOKMARK, RESUME, HISTORY } = TABS;

const tabs = [
  {
    id: HISTORY,
    title: '면접기록',
  },
  {
    id: BOOKMARK,
    title: '북마크한 채용공고',
  },
  {
    id: RESUME, //@TODO:  zustand 타입에도 추가 부탁드립니다.
    title: '내가 작성한 자소서',
  },
];

type Props = {
  userId: string;
  initialTabCounts: {
    [RESUME]: number;
    [HISTORY]: number;
    [BOOKMARK]: number;
  };
};

const TabButtons = ({ userId, initialTabCounts }: Props) => {
  const { setTab, tab: targetTab, resetTab } = useTabStore();
  const handleChangeTab = (newTab: Tabs) => {
    setTab(newTab);
  };

  useEffect(() => {
    return () => resetTab();
  }, []);

  const { data: tabCounts } = useTabCountQuery(userId, initialTabCounts);

  return (
    <ul className='flex h-12 items-center justify-evenly bg-cool-gray-100'>
      {tabs.map((tab) => (
        <li
          key={`tab_${tab.id}`}
          className={clsx(
            'text-md w-1/3 px-4 py-[14px] text-center font-bold text-cool-gray-900',
            targetTab === tab.id && 'border-b-2 border-b-primary-orange-600'
          )}
        >
          <button className='w-full' onClick={() => handleChangeTab(tab.id)}>
            {tab.title}
            {tabCounts[tab.id] !== 0 && (
              <Badge mx={1} size='small' color='dark'>
                {tabCounts[tab.id]}
              </Badge>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TabButtons;
