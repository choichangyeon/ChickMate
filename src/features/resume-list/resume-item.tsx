import { Resume } from '@prisma/client';
import { formatDate } from '@/utils/format-date';
import Typography from '@/components/ui/typography';

type Props = {
  resume: Resume;
};

const ResumeItem = ({ resume }: Props) => {
  const { title, createdAt, tryCount } = resume;
  const hasInterviewed = tryCount === 0;

  return (
    <li className='flex flex-col'>
      <Typography size='sm' weight='normal' color='gray-500'>
        {formatDate({ input: createdAt })}
      </Typography>
      <div className='flex items-end justify-between'>
        <Typography weight='bold'>{title}</Typography>
        {hasInterviewed ? (
          <Typography size='sm' weight='bold' color='gray-500'>
            면접 보기 전
          </Typography>
        ) : (
          <Typography size='sm' weight='bold' color='primary-600'>
            {tryCount}회 면접 완료
          </Typography>
        )}
      </div>
    </li>
  );
};

export default ResumeItem;
