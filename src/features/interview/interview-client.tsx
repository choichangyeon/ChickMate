'use client';

import Typography from '@/components/ui/typography';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import type { InterviewQnAType } from '@/types/DTO/interview-qna-dto';
import QuestionStep from '@/features/interview/question-step';
import CameraView from '@/features/interview/camera-view';
import QuestionDisplayWithTimer from '@/features/interview/question-display-with-timer';
import { useEffect, useRef } from 'react';
import { useInterviewStore } from '@/store/use-interview-store';
import { INTERVIEW_HISTORY_STATUS, INTERVIEW_LIMIT_COUNT } from '@/constants/interview-constants';
import { usePatchInterviewHistoryMutation } from '@/features/interview/hooks/use-interview-history-mutation';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { Notify } from 'notiflix';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const { IN_PROGRESS: IN_PROGRESS_STATUS } = INTERVIEW_HISTORY_STATUS;
const { IN_PROGRESS, HISTORY } = QUERY_KEY;

const CHECK_LEAST_INDEX = 1;
const CHECK_LAST_INDEX = -1;

type Props = {
  interviewHistory: InterviewHistoryType;
  interviewQnAList: InterviewQnAType[];
};

const InterviewClient = ({ interviewHistory, interviewQnAList }: Props) => {
  const setQuestionIndex = useInterviewStore((state) => state.setQuestionIndex);
  const hasCompleted = useInterviewStore((state) => state.hasCompleted);
  const setCompleted = useInterviewStore((state) => state.setCompleted);
  const { mutateAsync: patchInterviewHistoryMutate } = usePatchInterviewHistoryMutation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const completedState = useRef(hasCompleted);

  useEffect(() => {
    completedState.current = hasCompleted;
  }, [hasCompleted]);

  useEffect(() => {
    const hasAnsweredAll =
      interviewQnAList.length === INTERVIEW_LIMIT_COUNT && interviewQnAList.at(CHECK_LAST_INDEX)?.answer != null;
    const startIndex = hasAnsweredAll ? interviewQnAList.length : interviewQnAList.length - CHECK_LEAST_INDEX;
    setQuestionIndex(startIndex);

    const unmounted = async () => {
      try {
        if (!completedState.current) {
          await patchInterviewHistoryMutate({ interviewId: interviewHistory.id, status: IN_PROGRESS_STATUS });
          queryClient.invalidateQueries({ queryKey: [HISTORY] });
          queryClient.invalidateQueries({ queryKey: [IN_PROGRESS] });
        }
        setCompleted(false);
      } catch (error) {
        Notify.failure((error as Error).message);
      }
    };
    return () => {
      unmounted();
      router.refresh();
    };
  }, []);

  return (
    <div className='flex flex-col gap-8 mobile:gap-4'>
      <section className='flex w-full flex-col gap-4'>
        <div className='flex items-center justify-between mobile:flex-wrap mobile:gap-4'>
          <span className='hidden desktop:block'>
            <Typography size='2xl' weight='bold'>
              집중하세요! <span className='text-primary-orange-600'>면접이 시작됐습니다</span>
            </Typography>
          </span>
          <span className='hidden tablet:block'>
            <Typography size='2xl' color='primary-600' weight='bold'>
              면접 시작!
            </Typography>
          </span>
          <span className='hidden mobile:flex'>
            <Typography size='xl' weight='bold'>
              집중하세요! <span className='text-primary-orange-600'>면접이 시작됐습니다</span>
            </Typography>
          </span>
          <QuestionStep />
        </div>
        <div className='flex h-[335px] w-full gap-5 mobile:min-h-[450px] mobile:flex-wrap tablet:min-h-[800px] tablet:flex-wrap'>
          <div className='relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-cool-gray-200 bg-white'>
            <div className='mobile:hidden'>
              <Image
                src={`/assets/character/interviewer/poly-interviewer-${interviewHistory.interviewType}.png`}
                width={300}
                height={300}
                alt={interviewHistory.interviewType}
                priority
              />
            </div>
            <div className='hidden mobile:flex'>
              <Image
                src={`/assets/character/interviewer/poly-interviewer-${interviewHistory.interviewType}.png`}
                width={200}
                height={200}
                alt={interviewHistory.interviewType}
                priority
              />
            </div>
          </div>
          <CameraView />
        </div>
      </section>
      <QuestionDisplayWithTimer interviewHistory={interviewHistory} interviewQnAList={interviewQnAList} />
    </div>
  );
};

export default InterviewClient;
