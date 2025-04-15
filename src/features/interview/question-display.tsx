import Typography from '@/components/ui/typography';
import type { Message } from '@/types/message';
import { InterviewHistory } from '@prisma/client';

type Props = {
  messageList: Message[];
  interviewHistory: InterviewHistory;
};

const QuestionDisplay = ({ messageList, interviewHistory }: Props) => {
  const AIquestion = messageList[messageList.length - 1].content[0].text;
  const isFinalQuestionAsked = messageList.length >= 2 && messageList[1].role === 'assistant';
  const { interviewType } = interviewHistory;

  return (
    <div className='flex flex-col items-start gap-4'>
      <div>{interviewType === 'calm' ? '침착한 면접관' : '불타는 면접관'}</div>
      <div className='px-16'>
        {isFinalQuestionAsked ? (
          '면접보시느라 고생 많으셨습니다.'
        ) : messageList.length === 1 ? (
          <Typography color='gray-700'>안녕하세요. 면접 준비가 완료되었다면 간단한 자기소개 부탁드립니다.</Typography>
        ) : (
          AIquestion
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
