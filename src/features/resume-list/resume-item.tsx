import { formatDate } from '@/utils/format-date';
import Typography from '@/components/ui/typography';
import type { ResumeType } from '@/types/DTO/resume-dto';
import clsx from 'clsx';

type Props = {
  resume: ResumeType;
  onClick: (resumeId: ResumeType['id']) => void;
  hrOption?: boolean;
};

const ResumeItem = ({ resume, onClick, hrOption = true }: Props) => {
  const { id, title, createdAt, tryCount } = resume;
  const hasNotInterviewed = tryCount === 0;

  return (
    <li onClick={() => onClick(id)} className={clsx(hrOption && 'border-b', 'cursor-pointer py-2')}>
      <Typography size='sm' weight='normal' color='gray-500'>
        {formatDate({ input: createdAt })}
      </Typography>
      <div className='flex items-end justify-between'>
        <Typography weight='bold'>{title}</Typography>
        {hasNotInterviewed ? (
          <Typography size='sm' as='span' weight='bold' color='gray-500'>
            면접 보기 전
          </Typography>
        ) : (
          <Typography size='sm' weight='bold' as='span' color='primary-600'>
            {tryCount}회 면접 완료
          </Typography>
        )}
      </div>
    </li>
  );
};

export default ResumeItem;
