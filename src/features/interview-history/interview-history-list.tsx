'use client';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import type { InterviewHistory, User } from '@prisma/client';
import ErrorComponent from '@/components/common/error-component';
import { useInterviewHistoryInfiniteQuery } from '@/features/interview-history/hook/use-interview-history-infinite-query';
import { INTERVIEW_TYPE, INTERVIEW_TYPE_KR } from '@/constants/interview-constants';
import { useInfiniteScroll } from '@/hooks/customs/use-infinite-scroll';
import EmptyInterviewList from './empty-interview-list';

const { CALM, PRESSURE } = INTERVIEW_TYPE;

const getInterviewer = (type: InterviewHistory['interviewType']) => {
  return type === CALM ? `${INTERVIEW_TYPE_KR[CALM]} ☀️` : `${INTERVIEW_TYPE_KR[PRESSURE]} 🔥`;
};

const InterviewHistoryList = () => {
  const { data: session } = useSession();

  const userId: User['id'] | undefined = session?.user?.id;

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInterviewHistoryInfiniteQuery(
    userId!
  );

  const targetRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isPending) return <div className='text-center'>로딩 중..</div>;
  if (isError) return <ErrorComponent />;

  const histories = data.pages.flatMap((page) => page.histories);
  if (histories.length === 0) return <EmptyInterviewList />;
  return (
    <div className='flex h-[70dvh] flex-col'>
      <div className='flex-1 overflow-hidden'>
        <ul className='h-full overflow-y-auto scrollbar-hide'>
          {histories.map((history, index) => (
            <li
              key={`interview_list_${history.id}_${index}`}
              className={clsx(
                'flex cursor-pointer items-center justify-between py-2',
                histories.length !== index + 1 && 'border-b',
                history.isFeedbackCompleted && 'cursor-auto'
              )}
              onClick={() => {
                console.log('왼쪽 페이지 렌더링');
              }}
              aria-disabled={history.isFeedbackCompleted}
            >
              <div>
                <span className='text-md block font-bold text-cool-gray-900'>{history.resumeTitle}</span>
                <span className='text-sm'>{getInterviewer(history.interviewType)}</span>
              </div>
              <div>
                <span className='text-md block text-right text-primary-orange-600'>
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
