'use client';

import { Session } from 'next-auth';
import Typography from '@/components/ui/typography';
import Timer from '@/features/interview/timer';
import { useAudioWithTimer } from '@/features/interview/hooks/use-audio-with-timer';
import type { InterviewHistoryWithResume } from '@/types/interview';

const MINUTES_IN_MS = 1 * 60 * 1000;

type Props = {
  session: Session;
  interviewHistory: InterviewHistoryWithResume;
};

const QuestionDisplayWithTimer = ({ session, interviewHistory }: Props) => {
  const { isRecording, formattedTime, startRecordingWithTimer, stopRecordingWithTimer, messageList } =
    useAudioWithTimer(MINUTES_IN_MS, interviewHistory);

  const AIquestion = messageList[messageList.length - 1].content[0].text;

  // const question = messageList[messageList.length - 1].content[0].text;
  // const answer = messageList[messageList.length].content[0].text;

  const isFinalQuestionAsked = messageList.length === 17;

  return (
    <section className='flex gap-5'>
      <div className='flex flex-col items-start gap-4'>
        <div>불타는 면접관</div>
        <div className='px-16'>
          {isFinalQuestionAsked ? (
            '면접보시느라 고생 많으셨습니다.'
          ) : messageList.length === 1 ? (
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
        messageList={messageList}
      />
    </section>
  );
};

export default QuestionDisplayWithTimer;
