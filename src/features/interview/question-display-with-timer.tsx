'use client';

import { Session } from 'next-auth';
import Timer from '@/features/interview/timer';
import { useAudioWithTimer } from '@/features/interview/hooks/use-audio-with-timer';
import type { InterviewHistoryWithResume } from '@/types/interview';
import QuestionDisplay from './question-display';

const MINUTES_IN_MS = 1 * 60 * 1000;

type Props = {
  session: Session;
  interviewHistory: InterviewHistoryWithResume;
};

const QuestionDisplayWithTimer = ({ interviewHistory }: Props) => {
  const { isRecording, formattedTime, startRecordingWithTimer, stopRecordingWithTimer, messageList } =
    useAudioWithTimer(MINUTES_IN_MS, interviewHistory);

  return (
    <section className='flex gap-5'>
      <QuestionDisplay messageList={messageList} />
      <Timer
        isRecording={isRecording}
        formattedTime={formattedTime}
        startRecordingWithTimer={startRecordingWithTimer}
        stopRecordingWithTimer={stopRecordingWithTimer}
        messageList={messageList}
      />
    </section>
  );
};

export default QuestionDisplayWithTimer;
