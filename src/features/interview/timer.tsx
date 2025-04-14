'use client';

import { useRouter } from 'next/navigation';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';
import type { Message } from '@/types/message';

const { MY_PAGE } = PATH;

type Props = {
  isRecording: boolean;
  formattedTime: {
    minutes: string;
    seconds: string;
  };
  startRecordingWithTimer: () => void;
  stopRecordingWithTimer: () => void;
  messageList: Message[];
};

const Timer = ({ isRecording, formattedTime, startRecordingWithTimer, stopRecordingWithTimer, messageList }: Props) => {
  const router = useRouter();

  const handleButtonClick = () => {
    isRecording ? stopRecordingWithTimer() : startRecordingWithTimer();
  };

  const handleCompletedButtonClick = () => {
    router.push(MY_PAGE);
  };

  const isFinalQuestionAsked = messageList.length === 17;

  return (
    <div className='flex h-[220px] w-[526px] flex-shrink-0 flex-col items-center justify-center gap-4 border-2 p-6'>
      <div className='flex flex-col items-center'>
        <Typography size='2xl'>제한시간 안에 답변을 완료하세요</Typography>
        <Typography size='sm' weight='medium'>
          타이머가 종료되면 자동으로 답변이 종료됩니다
        </Typography>
      </div>
      <div>
        <Typography color='primary-600' size='3xl' weight='black'>
          {formattedTime.minutes} : {formattedTime.seconds}
        </Typography>
      </div>
      <div>
        {isFinalQuestionAsked ? (
          <button onClick={handleCompletedButtonClick}>면접 완료하기</button>
        ) : (
          <button onClick={handleButtonClick}>{isRecording ? '답변 완료하기' : '말하기'}</button>
        )}
      </div>
    </div>
  );
};

export default Timer;
