'use client';

import Timer from '@/features/interview/timer';
import { useAudioWithTimer } from '@/features/interview/hooks/use-audio-with-timer';
import QuestionDisplay from '@/features/interview/question-display';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import type { InterviewQnAType } from '@/types/DTO/interview-qna-dto';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { INTERVIEW_HISTORY_STATUS } from '@/constants/interview-constants';

const MINUTES_IN_MS = 1 * 60 * 1000;
const { IN_PROGRESS } = INTERVIEW_HISTORY_STATUS;
const CHECK_LAST_INDEX = -1;

type Props = {
  interviewHistory: InterviewHistoryType;
  interviewQnAList: InterviewQnAType[];
};

const QuestionDisplayWithTimer = ({ interviewHistory, interviewQnAList }: Props) => {
  const { isRecording, isAIVoicePlaying, formattedTime, aiQuestion, startRecordingWithTimer, stopRecordingWithTimer } =
    useAudioWithTimer({ duration: MINUTES_IN_MS, interviewHistory });

  let lastQuestion = interviewQnAList.at(CHECK_LAST_INDEX)?.question;

  if (interviewQnAList.at(CHECK_LAST_INDEX)?.answer) {
    lastQuestion = null;
  }

  if (!interviewQnAList && interviewHistory.status === IN_PROGRESS) {
    return (
      <section className='mt-20 flex items-center justify-center'>
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section className='flex gap-5'>
      <QuestionDisplay interviewHistory={interviewHistory} aiQuestion={aiQuestion || lastQuestion || '대기 중...'} />
      <Timer
        interviewHistory={interviewHistory}
        isRecording={isRecording}
        isAIVoicePlaying={isAIVoicePlaying}
        formattedTime={formattedTime}
        startRecordingWithTimer={startRecordingWithTimer}
        stopRecordingWithTimer={stopRecordingWithTimer}
      />
    </section>
  );
};

export default QuestionDisplayWithTimer;
