'use client';

import Timer from '@/features/interview/timer';
import { useAudioWithTimer } from '@/features/interview/hooks/use-audio-with-timer';
import QuestionDisplay from '@/features/interview/question-display';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import type { InterviewQnAType } from '@/types/DTO/interview-qna-dto';
import { INTERVIEW_HISTORY_STATUS } from '@/constants/interview-constants';
import LoadingAnimation from '@/components/common/loading-animation';

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
        <LoadingAnimation />
      </section>
    );
  }

  return (
    <section className='mobile:pb-[56px]'>
      <div className='flex gap-5 mobile:hidden'>
        <QuestionDisplay interviewHistory={interviewHistory} aiQuestion={aiQuestion || lastQuestion || '대기 중...'} />
        <Timer
          interviewHistory={interviewHistory}
          isRecording={isRecording}
          isAIVoicePlaying={isAIVoicePlaying}
          formattedTime={formattedTime}
          startRecordingWithTimer={startRecordingWithTimer}
          stopRecordingWithTimer={stopRecordingWithTimer}
        />
      </div>
      <div className='hidden flex-wrap gap-5 mobile:flex'>
        <Timer
          interviewHistory={interviewHistory}
          isRecording={isRecording}
          isAIVoicePlaying={isAIVoicePlaying}
          formattedTime={formattedTime}
          startRecordingWithTimer={startRecordingWithTimer}
          stopRecordingWithTimer={stopRecordingWithTimer}
        />
        <QuestionDisplay interviewHistory={interviewHistory} aiQuestion={aiQuestion || lastQuestion || '대기 중...'} />
      </div>
    </section>
  );
};

export default QuestionDisplayWithTimer;
