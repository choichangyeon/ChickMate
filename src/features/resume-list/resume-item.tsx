import { formatDate } from '@/utils/format-date';
import Typography from '@/components/ui/typography';
import type { ResumeType } from '@/types/DTO/resume-dto';

type Props = {
  resume: ResumeType;
  onClick: (resumeId: ResumeType['id']) => void;
};

const ResumeItem = ({ resume, onClick }: Props) => {
  const { id, title, createdAt, tryCount } = resume;
  const hasNotInterviewed = tryCount === 0;

  return (
    <div className='flex flex-col gap-4'>
      <li onClick={() => onClick(id)} className='flex cursor-pointer flex-col'>
        <Typography size='sm' weight='normal' color='gray-500'>
          {formatDate({ input: createdAt })}
        </Typography>
        <div className='flex items-end justify-between'>
          <Typography weight='bold'>{title}</Typography>
          {hasNotInterviewed ? (
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
      <hr className='border-cool-gray-300' />
    </div>
  );
};

export default ResumeItem;
