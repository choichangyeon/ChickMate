import { formatDate } from '@/utils/format-date';
import Typography from '@/components/ui/typography';
import type { ResumeType } from '@/types/DTO/resume-dto';
import clsx from 'clsx';

type Props = {
  resume: ResumeType;
  onClick: (resumeId: ResumeType['id']) => void;
  isLastChild?: boolean;
};

const ResumeItem = ({ resume, onClick, isLastChild = true }: Props) => {
  const { id, title, createdAt, tryCount } = resume;
  const hasNotInterviewed = tryCount === 0;

  return (
    <div className={clsx('flex flex-col gap-4 py-2 mobile:p-2', isLastChild ? 'border-b-0' : 'border-b')}>
      <li onClick={() => onClick(id)} className='flex cursor-pointer flex-col'>
        <Typography size='sm' weight='normal' color='gray-500'>
          <span className='mobile:text-xs'>{formatDate({ input: createdAt })}</span>
        </Typography>
        <div className='flex items-end justify-between'>
          <Typography weight='bold' lineClamp='1'>
            <span className='break-words mobile:text-sm'>{title}</span>
          </Typography>
          {hasNotInterviewed ? (
            <Typography size='sm' weight='bold' color='gray-500'>
              <span className='whitespace-nowrap mobile:ml-2 mobile:text-xs'>면접 보기 전</span>
            </Typography>
          ) : (
            <Typography size='sm' weight='bold' color='primary-600'>
              <span className='whitespace-nowrap mobile:text-xs'>{tryCount}회 면접 완료</span>
            </Typography>
          )}
        </div>
      </li>
    </div>
  );
};

export default ResumeItem;
