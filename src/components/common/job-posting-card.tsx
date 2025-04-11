'use client';

import Card from '@/components/common/card';
import Typography from '@/components/ui/typography';
import { formatDate } from '@/utils/format-date';
import { JobPosting } from '@prisma/client';
import clsx from 'clsx';

type Props = {
  jobPosting: JobPosting;
  children?: React.ReactNode;
  // TODO: iconButton type 수정
  iconButton?: boolean;
};

const JobPostingCard = ({ jobPosting, iconButton, children }: Props) => {
  const { company, title, experienceType, expiredAt, postedAt } = jobPosting;
  const postedAtDate = formatDate({ input: postedAt });
  const expiredAtDate = formatDate({ input: expiredAt });
  return (
    <Card>
      {iconButton && (
        // TODO: iconButton component 적용
        <div className='absolute right-[20px] top-[12px] h-6 w-6'>
          <div className='absolute left-[4px] top-[4px] h-0.5 w-4 bg-black' />
          <div className='absolute left-[8px] top-[2px] h-1 w-2 bg-black' />
          <div className='absolute left-[5px] top-[8px] h-3.5 w-3.5 bg-black' />
        </div>
      )}
      <div>
        <Typography weight='bold' color='gray-500'>
          {company}
        </Typography>
        <Typography as='h3' weight='bold' className='line-clamp-2'>
          {title}
        </Typography>
        <div className='flex flex-row items-center gap-[16px]'>
          <Typography size='sm' color='gray-500'>
            {experienceType}
          </Typography>
          <Typography size='sm' color='gray-500'>
            {postedAtDate}~{expiredAtDate}
          </Typography>
        </div>
      </div>
      {/* TODO: badge area */}
      <div className={badgeClassName}>{children} </div>
    </Card>
  );
};

const badgeClassName = clsx('flex gap-4');

export default JobPostingCard;
