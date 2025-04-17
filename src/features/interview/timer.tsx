'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@/components/ui/typography';
import Button from '@/components/ui/button';
import { PATH } from '@/constants/path-constant';
import { useExperienceUp } from '@/features/character/hooks/use-experience-up';
import { useInterviewStore } from '@/store/use-interview-store';
import { CHARACTER_HISTORY_KEY } from '@/constants/character-constants';
import type { Message } from '@/types/message';

const { MY_PAGE } = PATH;
const { INTERVIEW_COMPLETION } = CHARACTER_HISTORY_KEY;
const DISABLE_DURATION = 14000;

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
  const { handleExperienceUp } = useExperienceUp();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAnswerButtonClicked, setIsAnswerButtonClicked] = useState(false);
  const resetQuestionIndex = useInterviewStore((state) => state.resetQuestionIndex);

  const isFinalQuestionAsked = messageList.length >= 2 && messageList[1].role === 'assistant';

  const handleButtonClick = () => {
    if (isRecording) {
      stopRecordingWithTimer();
      setIsAnswerButtonClicked(true);
    } else {
      startRecordingWithTimer();
      setIsAnswerButtonClicked(false);
    }
  };

  const handleCompletedButtonClick = async () => {
    handleExperienceUp(INTERVIEW_COMPLETION);
    setIsAnswerButtonClicked(false);
    resetQuestionIndex();
    router.push(MY_PAGE);
  };

  useEffect(() => {
    if (!isRecording && isAnswerButtonClicked) {
      setIsButtonDisabled(true);
      const timer = setTimeout(() => setIsButtonDisabled(false), DISABLE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isRecording]);

  return (
    <div className='flex h-[220px] w-[526px] flex-shrink-0 flex-col items-center justify-center gap-4 rounded-lg border border-cool-gray-200 bg-cool-gray-10 p-8'>
      <div className='flex flex-col items-center'>
        <Typography size='2xl' weight='bold'>
          {isFinalQuestionAsked ? '완료 버튼을 누르고 피드백을 확인해보세요' : '제한시간 안에 답변을 완료하세요'}
        </Typography>
        <Typography size='sm' weight='medium' color='gray-500'>
          {!isFinalQuestionAsked && '타이머가 종료되면 자동으로 답변이 종료됩니다'}
        </Typography>
      </div>
      <div>
        {!isFinalQuestionAsked && (
          <Typography color='primary-600' size='6xl' weight='black'>
            {formattedTime.minutes} : {formattedTime.seconds}
          </Typography>
        )}
      </div>
      <div>
        {isFinalQuestionAsked ? (
          <Button variant='outline' color='dark' square onClick={handleCompletedButtonClick}>
            면접 완료하기
          </Button>
        ) : (
          <Button variant='outline' color='dark' disabled={isButtonDisabled} square onClick={handleButtonClick}>
            {isRecording ? '답변 완료하기' : '말하기'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
