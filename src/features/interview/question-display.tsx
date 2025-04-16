import Typography from '@/components/ui/typography';
import type { Message } from '@/types/message';
import { InterviewHistory } from '@prisma/client';
import Image from 'next/image';

type Props = {
  messageList: Message[];
  interviewHistory: InterviewHistory;
};

const QuestionDisplay = ({ messageList, interviewHistory }: Props) => {
  const { interviewType } = interviewHistory;
  const INTERVIEW_IMAGE = interviewType === 'calm' ? 2 : 3;

  const AIquestion = messageList[messageList.length - 1].content[0].text;
  const isFinalQuestionAsked = messageList.length >= 2 && messageList[1].role === 'assistant';

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
          {interviewType === 'calm' ? '침착한 면접관' : '불타는 면접관'}
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
