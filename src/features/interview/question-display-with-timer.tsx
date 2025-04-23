'use client';

import Timer from '@/features/interview/timer';
import { useAudioWithTimer } from '@/features/interview/hooks/use-audio-with-timer';
import QuestionDisplay from '@/features/interview/question-display';
import { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import { InterviewQnAType } from '@/types/DTO/interview-qna-dto';
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

  if (!interviewQnAList && interviewHistory.status === IN_PROGRESS) {
    return (
      <section className='mt-20 flex items-center justify-center'>
        <LoadingSpinner />
      </section>
    );
  }
  return (
    <section className='flex gap-5'>
      <QuestionDisplay
        interviewHistory={interviewHistory}
        aiQuestion={
          aiQuestion || interviewQnAList.at(CHECK_LAST_INDEX)?.answer
            ? '대기중..'
            : interviewQnAList.at(CHECK_LAST_INDEX)?.question ||
              '면접 준비가 완료되었다면, 말하기 버튼을 눌러 자기 소개를 해주세요.'
        }
      />
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
