'use client';
import { INTERVIEW_TYPE, INTERVIEW_TYPE_KR } from '@/constants/interview-constants';
import { TABS } from '@/constants/my-page-constants';
import clsx from 'clsx';
import ErrorComponent from '@/components/common/error-component';
import EmptyList from '@/features/my-page/empty-list';
import { useInterviewHistoryInfiniteQuery } from '@/features/interview-history/hook/use-interview-history-infinite-query';
import { useInfiniteScroll } from '@/hooks/customs/use-infinite-scroll';
import type { InterviewHistory, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const { CALM } = INTERVIEW_TYPE;
const { CALM_KR, PRESSURE_KR } = INTERVIEW_TYPE_KR;
const { HISTORY } = TABS;

const getInterviewer = (type: InterviewHistory['interviewType']) => {
  return type === CALM ? `${CALM_KR} ☀️` : `${PRESSURE_KR} 🔥`;
};

const InterviewHistoryList = () => {
  const { data: session } = useSession();
  const userId: User['id'] | undefined = session?.user?.id;
  const router = useRouter();

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInterviewHistoryInfiniteQuery(
    userId!
  );

  const targetRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isPending) return <div className='text-center'>로딩 중..</div>;
  if (isError) return <ErrorComponent />;

  const handleGetDetailList = (historyId: InterviewHistory['id']) => {
    router.push(`?id=${historyId}&tab=${HISTORY}`);
  };

  const histories = data.pages.flatMap((page) => page.histories);
  if (histories.length === 0) return <EmptyList tab={HISTORY} />;
  return (
    <div className='flex h-[70dvh] flex-col'>
      <div className='flex-1 overflow-hidden'>
        <ul className='h-full overflow-y-auto scrollbar-hide'>
          {histories.map((history, index) => (
            <li
              key={`interview_list_${history.id}_${index}`}
              className={clsx(
                'flex items-center justify-between py-2',
                histories.length !== index + 1 && 'border-b',
                history.isFeedbackCompleted && 'cursor-pointer'
              )}
              onClick={() => (history.isFeedbackCompleted ? handleGetDetailList(history.id) : null)}
              aria-disabled={history.isFeedbackCompleted}
            >
              <div>
                <span className='text-md block font-bold text-cool-gray-900'>{history.resumeTitle}</span>
                <span className='text-sm'>{getInterviewer(history.interviewType)}</span>
              </div>
              <div>
                <span
                  className={clsx(
                    'text-md block text-right',
                    !history.isFeedbackCompleted && 'text-primary-orange-600'
                  )}
                >
                  {history.isFeedbackCompleted ? '평가 완료' : '평가 중'}
                </span>
                <span className='text-sm'>{history.createdDate}</span>
              </div>
            </li>
          ))}
          <div ref={targetRef} className='flex h-10 w-full items-center justify-center text-sm text-gray-400'>
            {isFetchingNextPage && <span>로딩 중...</span>}
          </div>
        </ul>
      </div>
    </div>
  );
};
export default InterviewHistoryList;
