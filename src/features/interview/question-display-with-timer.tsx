'use client';

import Timer from '@/features/interview/timer';
import { useAudioWithTimer } from '@/features/interview/hooks/use-audio-with-timer';
import QuestionDisplay from '@/features/interview/question-display';
import { InterviewHistoryType } from '@/types/DTO/interview-history-dto';

const MINUTES_IN_MS = 1 * 60 * 1000;

type Props = {
  interviewHistory: InterviewHistoryType;
};

const QuestionDisplayWithTimer = ({ interviewHistory }: Props) => {
  const { isRecording, isAIVoicePlaying, formattedTime, aiQuestion, startRecordingWithTimer, stopRecordingWithTimer } =
    useAudioWithTimer({ duration: MINUTES_IN_MS, interviewHistory });

  return (
    <section className='flex gap-5'>
      <QuestionDisplay
        interviewHistory={interviewHistory}
        aiQuestion={aiQuestion || '면접 준비가 완료되었다면, 말하기 버튼을 눌러 자기 소개를 해주세요.'}
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
