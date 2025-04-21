import Typography from '@/components/ui/typography';
import { Resume } from '@prisma/client';

type Props = {
  content: Resume['content'];
};

const ResumeQnAItem = ({ content }: Props) => {
  console.log(content);
  return (
    <li className='flex flex-col gap-4'>
      <div>
        <Typography color='primary-600' weight='bold'>
          질문 1
        </Typography>
        <Typography size='xl' weight='normal'>
          {content.question}
        </Typography>
      </div>
      <hr className='border-cool-gray-500' />
      <Typography color='gray-700' weight='normal'>
        {content.answer}
      </Typography>
    </li>
  );
};

export default ResumeQnAItem;
