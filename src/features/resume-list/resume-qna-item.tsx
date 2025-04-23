import Typography from '@/components/ui/typography';
import type { Field } from '@/types/resume';

type Props = {
  content: Field;
  idx: number;
};

const ResumeQnAItem = ({ content, idx }: Props) => {
  const { question, answer } = content;

  return (
    <li className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Typography color='primary-600' weight='bold'>
          질문 {idx + 1}
        </Typography>
        <Typography size='xl' weight='normal'>
          {question}
        </Typography>
      </div>
      <hr className='border-cool-gray-500' />
      <Typography color='gray-700' weight='normal'>
        {answer}
      </Typography>
    </li>
  );
};

export default ResumeQnAItem;
