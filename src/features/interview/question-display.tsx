import Image from 'next/image';
import Typography from '@/components/ui/typography';
import { INTERVIEW_LIMIT_COUNT, INTERVIEW_TYPE, INTERVIEW_TYPE_KR } from '@/constants/interview-constants';
import { useInterviewStore } from '@/store/use-interview-store';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';

const { CALM } = INTERVIEW_TYPE;
const { CALM_KR, PRESSURE_KR } = INTERVIEW_TYPE_KR;

type Props = {
  interviewHistory: InterviewHistoryType;
  aiQuestion: string;
};

const QuestionDisplay = ({ interviewHistory, aiQuestion }: Props) => {
  const { interviewType } = interviewHistory;
  const isInterviewTypeCalm = interviewType === CALM;

  const questionIndex = useInterviewStore((state) => state.questionIndex);
  const isFinalQuestionAsked = questionIndex >= INTERVIEW_LIMIT_COUNT;

  return (
    <div className='flex w-full flex-col items-start gap-4 mobile:rounded-lg mobile:bg-cool-gray-50 mobile:p-4'>
      <div className='flex w-full items-center gap-4'>
        {/** TODO: header에 있는 이미지랑 통일 */}
        <div className='h-12 w-12 overflow-hidden rounded-full'>
          <Image
            src={`/assets/character/interviewer/poly-interviewer-icon-${interviewType}.png`}
            width={48}
            height={48}
            alt={interviewType}
            priority
          />
        </div>
        <Typography color='primary-600' weight='bold'>
          {isInterviewTypeCalm ? CALM_KR : PRESSURE_KR}
        </Typography>
      </div>
      <div className='w-full overflow-hidden border-t border-cool-gray-500 px-16 py-2 mobile:px-2 tablet:px-8'>
        <span className='hidden desktop:flex'>
          <Typography color='gray-700' weight='normal'>
            {isFinalQuestionAsked ? '면접보시느라 고생 많으셨습니다.' : aiQuestion}
          </Typography>
        </span>
        <span className='hidden tablet:flex'>
          <Typography color='gray-700' weight='normal' size='sm'>
            {isFinalQuestionAsked ? '면접보시느라 고생 많으셨습니다.' : aiQuestion}
          </Typography>
        </span>
        <span className='hidden mobile:flex'>
          <Typography color='gray-700' weight='normal' size='xs'>
            {isFinalQuestionAsked ? '면접보시느라 고생 많으셨습니다.' : aiQuestion}
          </Typography>
        </span>
      </div>
    </div>
  );
};

export default QuestionDisplay;
