'use client';

import Typography from '@/components/ui/typography';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import type { InterviewQnAType } from '@/types/DTO/interview-qna-dto';
import QuestionStep from '@/features/interview/question-step';
import CameraView from '@/features/interview/camera-view';
import QuestionDisplayWithTimer from '@/features/interview/question-display-with-timer';
import { useEffect, useRef } from 'react';
import { useInterviewStore } from '@/store/use-interview-store';
import { patchInterviewHistoryStatus } from '@/features/interview/api/client-services';
import { INTERVIEW_HISTORY_STATUS, INTERVIEW_LIMIT_COUNT } from '@/constants/interview-constants';

const { IN_PROGRESS } = INTERVIEW_HISTORY_STATUS;

const CHECK_LEAST_INDEX = 1;
const CHECK_LAST_INDEX = -1;

type Props = {
  interviewHistory: InterviewHistoryType;
  interviewQnAList: InterviewQnAType[];
};

const InterviewClient = ({ interviewHistory, interviewQnAList }: Props) => {
  const setQuestionIndex = useInterviewStore((state) => state.setQuestionIndex);
  const questionIndex = useInterviewStore((state) => state.questionIndex);
  const latestQuestionIndex = useRef(questionIndex);

  useEffect(() => {
    latestQuestionIndex.current = questionIndex;
  }, [questionIndex]);

  useEffect(() => {
    if (interviewQnAList.length === INTERVIEW_LIMIT_COUNT && interviewQnAList.at(CHECK_LAST_INDEX)?.answer !== null) {
      setQuestionIndex(interviewQnAList.length);
    } else {
      setQuestionIndex(interviewQnAList.length - CHECK_LEAST_INDEX);
    }
    return () => {
      if (latestQuestionIndex.current < INTERVIEW_LIMIT_COUNT) {
        patchInterviewHistoryStatus({ interviewId: interviewHistory.id, status: IN_PROGRESS });
      }
    };
  }, []);

  return (
    <div className='flex flex-col gap-8 px-[50px] py-8'>
      <section className='flex w-full flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <Typography size='2xl' weight='bold'>
            집중하세요! <span className='text-primary-orange-600'>면접이 시작됐습니다</span>
          </Typography>
          <QuestionStep />
        </div>
        <div className='flex h-[335px] gap-5'>
          <div className='flex-1 rounded-lg border border-cool-gray-200 bg-white'>면접관</div>
          <CameraView />
        </div>
      </section>
      <QuestionDisplayWithTimer interviewHistory={interviewHistory} interviewQnAList={interviewQnAList} />
    </div>
  );
};

export default InterviewClient;
