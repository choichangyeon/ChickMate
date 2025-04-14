'use client';
import clsx from 'clsx';
import type { InterviewHistory, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import ErrorComponent from '@/components/common/error-component';
import { INTERVIEW_TYPE, INTERVIEW_TYPE_KR } from '@/constants/interview-constants';
import { useHistoryQuery } from '@/features/interview-history/hook/use-history-query';

const { CALM, PRESSURE } = INTERVIEW_TYPE;

const getInterviewer = (type: InterviewHistory['interviewType']) => {
  return type === CALM ? `${INTERVIEW_TYPE_KR[CALM]} ☀️` : `${INTERVIEW_TYPE_KR[PRESSURE]} 🔥`;
};

const InterviewHistoryList = () => {
  const { data } = useSession();

  const userId: User['id'] | undefined = data?.user?.id;

  const { data: histories, isPending, isError } = useHistoryQuery(userId);

  if (isPending) return <div className='text-center'>로딩 중..</div>;
  if (isError) return <ErrorComponent />;
  if (!histories || histories.length === 0)
    return (
      <div className='text-center text-cool-gray-500'>
        면접 결과가 없습니다.
        <br /> 면접을 먼저 진행해 주세요.
      </div>
    );
  return (
    <ul>
      {histories.map((history, index) => (
        <li
          key={`interview_list_${history.id}`}
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
    </ul>
  );
};
export default InterviewHistoryList;
