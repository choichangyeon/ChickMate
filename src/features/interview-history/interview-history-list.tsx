'use client';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useInterviewHistoryInfiniteQuery } from '@/features/interview-history/hook/use-interview-history-infinite-query';
import EmptyList from '@/features/my-page/empty-list';
import { getMyPagePath } from '@/features/my-page/utils/get-my-page-path';
import { useInfiniteScroll } from '@/hooks/customs/use-infinite-scroll';
import ErrorComponent from '@/components/common/error-component';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { INTERVIEW_TYPE, INTERVIEW_TYPE_KR } from '@/constants/interview-constants';
import { TABS } from '@/constants/my-page-constants';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import type { UserType } from '@/types/DTO/user-dto';

const { CALM } = INTERVIEW_TYPE;
const { CALM_KR, PRESSURE_KR } = INTERVIEW_TYPE_KR;
const { INTERVIEW_HISTORY_TAB } = TABS;

const getInterviewer = (type: InterviewHistoryType['interviewType']) => {
  return type === CALM ? `${CALM_KR} ☀️` : `${PRESSURE_KR} 🔥`;
};

const InterviewHistoryList = () => {
  const { data: session } = useSession();
  const userId: UserType['id'] | undefined = session?.user?.id;
  const router = useRouter();

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInterviewHistoryInfiniteQuery(
    userId!
  );

  const targetRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isPending)
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  if (isError) return <ErrorComponent />;

  const handleGetDetailList = (historyId: InterviewHistoryType['id']) => {
    router.push(getMyPagePath(INTERVIEW_HISTORY_TAB, historyId));
  };

  const histories = data.pages.flatMap((page) => page.histories);
  if (histories.length === 0) return <EmptyList tab={INTERVIEW_HISTORY_TAB} />;
  return (
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
            <span className='text-md block font-bold text-cool-gray-900'>{history.title}</span>
            <span className='text-sm'>{getInterviewer(history.interviewer)}</span>
          </div>
          <div>
            <span
              className={clsx('text-md block text-right', !history.isFeedbackCompleted && 'text-primary-orange-600')}
            >
              {history.isFeedbackCompleted ? '평가 완료' : '평가 중'}
            </span>
            <span className='text-sm'>{history.createdAt}</span>
          </div>
        </li>
      ))}
      <div ref={targetRef} className='flex h-10 w-full items-center justify-center text-sm text-gray-400'>
        {isFetchingNextPage && <span>로딩 중...</span>}
      </div>
    </ul>
  );
};
export default InterviewHistoryList;
