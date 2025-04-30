'use client';

import Badge from '@/components/ui/badge';
import Card from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { INTERVIEW_HISTORY_BADGE } from '@/constants/interview-constants';
import { formatDate } from '@/utils/format-date';
import { Resume } from '@prisma/client';
import clsx from 'clsx';

const { DONE, NOT_DONE } = INTERVIEW_HISTORY_BADGE;
const badgeClassName = clsx('flex flex-row gap-4');

type Props = {
  type?: 'resume' | 'interview';
  resume: Resume;
  isSelected?: boolean;
  onSelect?: () => void;
};

const ResumeCard = ({ type = 'resume', resume, isSelected, onSelect }: Props) => {
  const { title, updatedAt, createdAt, tryCount } = resume;
  const updatedAtDate = formatDate({ input: updatedAt });
  const createdAtDate = formatDate({ input: createdAt });

  const selectedClassName = isSelected
    ? 'cursor-pointer border-2 border-primary-orange-600 bg-cool-gray-10 shadow-lg shadow-primary-orange-600/20'
    : 'cursor-pointer';
  const handleClick = () => {
    if (type === 'interview') {
      onSelect && onSelect();
    }
    // TODO: 이력서 상세 페이지로 이동
  };

  return (
    <Card onClick={handleClick} className={clsx(selectedClassName, 'w-80 flex-shrink-0')}>
      <div>
        <Typography size='sm' color='gray-500'>
          {updatedAt ? updatedAtDate : createdAtDate}
        </Typography>
        <Typography as='h3' weight='bold' lineClamp='1'>
          <span className='break-words'>{title}</span>
        </Typography>
      </div>
      <div className={badgeClassName}>
        {tryCount > 0 ? (
          <>
            <Badge>{DONE}</Badge>
            <Badge variant='outline'>{tryCount}회</Badge>
          </>
        ) : (
          <Badge color='dark'>{NOT_DONE}</Badge>
        )}
      </div>
    </Card>
  );
};

export default ResumeCard;
