'use client';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTabCountQuery } from '@/features/my-page/hook/use-tab-count-query';
import { getMyPagePath } from '@/features/my-page/utils/get-my-page-path';
import Badge from '@/components/ui/badge';
import { TABS } from '@/constants/my-page-constants';
import type { Tabs } from '@/types/tab-type';

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
    id: RESUME,
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleChangeTab = (targetTab: Tabs) => {
    router.push(getMyPagePath(targetTab));
  };

  const { data: tabCounts } = useTabCountQuery(userId, initialTabCounts);

  return (
    <ul className='flex h-[48px] items-center justify-evenly bg-cool-gray-100'>
      {tabs.map((tab) => {
        const currentTab = searchParams.get('tab') ?? HISTORY;
        const isCurrentTab = currentTab === tab.id;

        return (
          <li
            key={`tab_${tab.id}`}
            className={clsx(
              'text-md h-full w-1/3 px-4 py-[14px] text-center font-bold text-cool-gray-900',
              isCurrentTab && 'border-b-2 border-b-primary-orange-600'
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
        );
      })}
    </ul>
  );
};

export default TabButtons;
