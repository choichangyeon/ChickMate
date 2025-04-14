'use client';

import { Session } from 'next-auth';
import Typography from '@/components/ui/typography';
import Timer from '@/features/interview/timer';
import type { InterviewHistoryWithResume } from '@/types/interview';
import { useAudioWithTimer } from './hooks/use-audio-with-timer';

const MINUTES_IN_MS = 1 * 60 * 1000;

type Props = {
  session: Session;
  interviewHistory: InterviewHistoryWithResume;
};

const InterviewPromptWithTimer = ({ session, interviewHistory }: Props) => {
  const { isRecording, formattedTime, startRecordingWithTimer, stopRecordingWithTimer, messageList } =
    useAudioWithTimer(MINUTES_IN_MS, interviewHistory);

  const AIquestion = messageList[messageList.length - 1].content[0].text;

  return (
    <section className='flex gap-5'>
      <div className='flex flex-col items-start gap-4'>
        <div>불타는 면접관</div>
        <div className='px-16'>
          {messageList.length === 1 ? (
            <Typography color='gray-700'>안녕하세요 {session.user.name}님 간단한 자기소개 부탁드립니다.</Typography>
          ) : (
            AIquestion
          )}
        </div>
      </div>
      <Timer
        isRecording={isRecording}
        formattedTime={formattedTime}
        startRecordingWithTimer={startRecordingWithTimer}
        stopRecordingWithTimer={stopRecordingWithTimer}
      />
    </section>
  );
};

export default InterviewPromptWithTimer;
