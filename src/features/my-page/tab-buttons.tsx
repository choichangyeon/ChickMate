'use client';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import Badge from '@/components/ui/badge';
import { TABS } from '@/constants/my-page-constants';
import { useTabCountQuery } from '@/features/my-page/hook/use-tab-count-query';
import { getMyPagePath } from '@/features/my-page/utils/get-my-page-path';
import type { Tabs } from '@/types/tab-type';

const { BOOKMARK_TAB, RESUME_TAB, INTERVIEW_HISTORY_TAB } = TABS;

const tabs = [
  {
    id: INTERVIEW_HISTORY_TAB,
    title: '내 면접기록',
  },
  {
    id: BOOKMARK_TAB,
    title: '내 채용공고',
  },
  {
    id: RESUME_TAB,
    title: '내 자소서',
  },
];

type Props = {
  userId: string;
  initialTabCounts: {
    [RESUME_TAB]: number;
    [INTERVIEW_HISTORY_TAB]: number;
    [BOOKMARK_TAB]: number;
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
        const currentTab = searchParams.get('tab') ?? INTERVIEW_HISTORY_TAB;
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
                <Badge mx={1} size='small' color={isCurrentTab ? 'primary' : 'dark'}>
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
