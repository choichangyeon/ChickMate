'use client';

import { useRouter } from 'next/navigation';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';
import type { Message } from '@/types/message';
import { useExperienceUp } from '@/features/character/hooks/use-experience-up';
import { CHARACTER_HISTORY_KEY } from '@/constants/character-constants';
import Button from '@/components/ui/button';
import { useInterviewStore } from '@/store/use-interview-store';

const { MY_PAGE } = PATH;
const { INTERVIEW_COMPLETION } = CHARACTER_HISTORY_KEY;

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
  const resetQuestionIndex = useInterviewStore((state) => state.resetQuestionIndex);
  const { handleExperienceUp } = useExperienceUp();

  const handleButtonClick = () => {
    isRecording ? stopRecordingWithTimer() : startRecordingWithTimer();
  };

  const handleCompletedButtonClick = async () => {
    handleExperienceUp(INTERVIEW_COMPLETION);
    resetQuestionIndex();
    router.push(MY_PAGE);
  };

  const isFinalQuestionAsked = messageList.length >= 2 && messageList[1].role === 'assistant';

  return (
    <div className='flex h-[220px] w-[526px] flex-shrink-0 flex-col items-center justify-center gap-4 rounded-lg border border-cool-gray-200 bg-cool-gray-10 p-8'>
      <div className='flex flex-col items-center'>
        <Typography size='2xl' weight='bold'>
          제한시간 안에 답변을 완료하세요
        </Typography>
        <Typography size='sm' weight='medium' color='gray-500'>
          타이머가 종료되면 자동으로 답변이 종료됩니다
        </Typography>
      </div>
      <div>
        <Typography color='primary-600' size='6xl' weight='black'>
          {formattedTime.minutes} : {formattedTime.seconds}
        </Typography>
      </div>
      <div>
        {isFinalQuestionAsked ? (
          <button onClick={handleCompletedButtonClick}>면접 완료하기</button>
        ) : (
          <Button variant='outline' color='dark' square onClick={handleButtonClick}>
            {isRecording ? '답변 완료하기' : '말하기'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
