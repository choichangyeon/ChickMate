'use client';

import Typography from '@/components/ui/typography';
import { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import { InterviewQnAType } from '@/types/DTO/interview-qna-dto';
import QuestionStep from '@/features/interview/question-step';
import CameraView from '@/features/interview/camera-view';
import QuestionDisplayWithTimer from '@/features/interview/question-display-with-timer';
import { useEffect } from 'react';
import { useInterviewStore } from '@/store/use-interview-store';

type Props = {
  interviewHistory: InterviewHistoryType;
  interviewQnAList: InterviewQnAType[];
};

const InterviewClient = ({ interviewHistory, interviewQnAList }: Props) => {
  const setQuestionIndex = useInterviewStore((state) => state.setQuestionIndex);
  useEffect(() => {
    setQuestionIndex(interviewQnAList.length - 1);
  }, []);
  return (
    <main className='flex flex-col gap-8 px-[50px] py-8'>
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
      <QuestionDisplayWithTimer interviewHistory={interviewHistory} />
    </main>
  );
};

export default InterviewClient;
