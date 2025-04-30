'use client';

import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { CHARACTER_HISTORY_KEY } from '@/constants/character-constants';
import { INTERVIEW_HISTORY_STATUS, INTERVIEW_LIMIT_COUNT } from '@/constants/interview-constants';
import { PATH } from '@/constants/path-constant';
import { QUERY_KEY } from '@/constants/query-key';
import { useExperienceUp } from '@/features/character/hooks/use-experience-up';
import { usePostAIFeedbackMutation } from '@/features/interview/hooks/use-ai-feedback-mutation';
import { usePatchInterviewHistoryMutation } from '@/features/interview/hooks/use-interview-history-mutation';
import { useCharacterStore } from '@/store/use-character-store';
import { useInterviewStore } from '@/store/use-interview-store';
import type { InterviewHistory } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { useRouter } from 'next/navigation';
import { INTERVIEW_HISTORY } from '@/constants/message-constants';

const { MY_PAGE } = PATH;
const { INTERVIEW_COMPLETION } = CHARACTER_HISTORY_KEY;
const { TABS_COUNT, HISTORY, IN_PROGRESS } = QUERY_KEY;
const { COMPLETED } = INTERVIEW_HISTORY_STATUS;
const {
  API: { SUCCESS_WITH_EXP },
} = INTERVIEW_HISTORY;

type Props = {
  interviewHistory: InterviewHistory;
  isRecording: boolean;
  isAIVoicePlaying: boolean;
  formattedTime: {
    minutes: string;
    seconds: string;
  };
  startRecordingWithTimer: () => void;
  stopRecordingWithTimer: () => void;
};

const Timer = ({
  interviewHistory,
  isRecording,
  isAIVoicePlaying,
  formattedTime,
  startRecordingWithTimer,
  stopRecordingWithTimer,
}: Props) => {
  const router = useRouter();
  const { mutateAsync: patchInterviewHistoryMutate, error: InterviewHistoryError } = usePatchInterviewHistoryMutation();
  const { mutate: postAIFeedbackMutate, error: aiFeedbackError } = usePostAIFeedbackMutation();
  const queryClient = useQueryClient();
  const characterId = useCharacterStore((state) => state.characterId);
  const setCompleted = useInterviewStore((state) => state.setCompleted);
  const { handleExperienceUp } = useExperienceUp();

  const questionIndex = useInterviewStore((state) => state.questionIndex);
  const isFinalQuestionAsked = questionIndex >= INTERVIEW_LIMIT_COUNT;

  {
    /** TODO: 에러 처리 알림에 대한 고민 필요 */
  }
  if (InterviewHistoryError) {
    Notify.warning(InterviewHistoryError.message);
  }
  if (aiFeedbackError) {
    Notify.warning(aiFeedbackError.message);
  }

  const handleButtonClick = () => {
    if (isRecording) {
      stopRecordingWithTimer();
    } else {
      startRecordingWithTimer();
    }
  };

  const handleCompletedButtonClick = async () => {
    try {
      if (characterId) {
        //@TODO: 캐릭터 아이디 있을 때만
        handleExperienceUp(INTERVIEW_COMPLETION);
        Notify.success(SUCCESS_WITH_EXP);
      }

      setCompleted(true);

      await patchInterviewHistoryMutate({ interviewId: interviewHistory.id, status: COMPLETED });
      queryClient.invalidateQueries({ queryKey: [HISTORY] });
      queryClient.removeQueries({ queryKey: [IN_PROGRESS] });

      postAIFeedbackMutate(interviewHistory.id);
      queryClient.invalidateQueries({
        queryKey: [TABS_COUNT],
      });
      router.push(MY_PAGE);
    } catch (error) {
      Notify.failure((error as Error).message);
    }
  };

  return (
    <>
      <div className='hidden w-full flex-col items-center justify-center gap-2 mobile:flex'>
        <Typography size='lg' weight='bold' align='center'>
          {isFinalQuestionAsked ? (
            <>
              <span className='text-primary-orange-600'>완료 버튼</span> 을 누르고 피드백을 확인해보세요
            </>
          ) : (
            <>
              <span className='text-primary-orange-600'>제한시간</span> 안에 답변을 완료하세요
            </>
          )}
        </Typography>
        {!isFinalQuestionAsked && (
          <span className='hidden mobile:flex'>
            <Typography color='primary-600' size='2xl' weight='black'>
              {formattedTime.minutes} : {formattedTime.seconds}
            </Typography>
          </span>
        )}
        <div>
          {isFinalQuestionAsked ? (
            <Button square onClick={handleCompletedButtonClick}>
              면접 완료하기
            </Button>
          ) : (
            <Button disabled={isAIVoicePlaying} square onClick={handleButtonClick}>
              {isRecording ? '답변 완료하기' : isAIVoicePlaying ? '질문 생성 중...' : '말하기'}
            </Button>
          )}
        </div>
      </div>
      <div className='flex h-[220px] w-[526px] flex-shrink-0 flex-col items-center justify-center gap-4 rounded-lg border border-cool-gray-200 bg-cool-gray-10 p-8 mobile:hidden tablet:w-[220px] tablet:gap-2'>
        <div className='flex flex-col items-center'>
          <span className='hidden desktop:flex'>
            <Typography size='2xl' weight='bold'>
              {isFinalQuestionAsked ? '완료 버튼을 누르고 피드백을 확인해보세요' : '제한시간 안에 답변을 완료하세요'}
            </Typography>
          </span>
          <span className='hidden tablet:flex'>
            <Typography size='lg' weight='bold' align='center'>
              {isFinalQuestionAsked ? '완료 버튼을 누르고 피드백을 확인해보세요' : '제한시간 안에 답변을 완료하세요'}
            </Typography>
          </span>

          <span className='hidden desktop:flex'>
            <Typography size='sm' weight='medium' color='gray-500'>
              {!isFinalQuestionAsked && '타이머가 종료되면 자동으로 답변이 종료됩니다'}
            </Typography>
          </span>
          <span className='desktop:hidden'>
            <Typography size='xs' weight='medium' color='gray-500' align='center'>
              {!isFinalQuestionAsked && '타이머가 종료되면 자동으로 답변이 종료됩니다'}
            </Typography>
          </span>
        </div>
        <div>
          {!isFinalQuestionAsked && (
            <>
              <span className='tablet:hidden'>
                <Typography color='primary-600' size='6xl' weight='black'>
                  {formattedTime.minutes} : {formattedTime.seconds}
                </Typography>
              </span>
              <span className='desktop:hidden'>
                <Typography color='primary-600' size='3xl' weight='black'>
                  {formattedTime.minutes} : {formattedTime.seconds}
                </Typography>
              </span>
            </>
          )}
        </div>
        <div>
          {isFinalQuestionAsked ? (
            <Button square onClick={handleCompletedButtonClick}>
              면접 완료하기
            </Button>
          ) : (
            <Button disabled={isAIVoicePlaying} square onClick={handleButtonClick}>
              {isRecording ? '답변 완료하기' : isAIVoicePlaying ? '질문 생성 중...' : '말하기'}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Timer;
