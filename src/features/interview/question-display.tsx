import Image from 'next/image';
import { InterviewHistory } from '@prisma/client';
import Typography from '@/components/ui/typography';
import { INTERVIEW_TYPE, INTERVIEW_TYPE_KR, PROMPT_ROLE } from '@/constants/interview-constants';
import type { Message } from '@/types/message';

const { CALM } = INTERVIEW_TYPE;
const { CALM_KR, PRESSURE_KR } = INTERVIEW_TYPE_KR;
const { ASSISTANT } = PROMPT_ROLE;

type Props = {
  messageList: Message[];
  interviewHistory: InterviewHistory;
};

const QuestionDisplay = ({ messageList, interviewHistory }: Props) => {
  const { interviewType } = interviewHistory;
  const INTERVIEW_IMAGE = interviewType === CALM ? 2 : 3; // TODO: 면접관 이미지 확정되면 수정

  const AIquestion = messageList[messageList.length - 1].content[0].text;
  const isFinalQuestionAsked = messageList.length >= 2 && messageList[1].role === ASSISTANT;
  const isInterviewTypeCalm = interviewType === CALM;

  return (
    <div className='flex w-full flex-col items-start gap-4'>
      <div className='flex w-full items-center gap-4'>
        {/** TODO: header에 있는 이미지랑 통일 */}
        <div className='h-12 w-12 overflow-hidden rounded-full'>
          <Image
            src={`/assets/character/header/level${INTERVIEW_IMAGE}.jpeg`}
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
      <div className='w-full border-t border-cool-gray-500 px-16 py-2'>
        {isFinalQuestionAsked ? (
          '면접보시느라 고생 많으셨습니다.'
        ) : messageList.length === 1 ? (
          <Typography color='gray-700' weight='normal'>
            안녕하세요. 면접 준비가 완료되었다면 간단한 자기소개 부탁드립니다.
          </Typography>
        ) : (
          AIquestion
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
