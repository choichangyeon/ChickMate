'use client';

import Card from '@/components/common/card';
import Typography from '@/components/ui/typography';
import { formatDate } from '@/utils/format-date';
import { JobPosting } from '@prisma/client';
import clsx from 'clsx';

type Props = {
  jobPosting: JobPosting;
  children?: React.ReactNode;
};

const JobPostingCard = ({ jobPosting, children }: Props) => {
  const { company, title, experienceType, expiredAt, postedAt } = jobPosting;
  const postedAtDate = formatDate({ input: postedAt });
  const expiredAtDate = formatDate({ input: expiredAt });
  return (
    <Card iconButton={true}>
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
      {/* badge area */}
      <div className={badgeClassName}>{children} </div>
    </Card>
  );
};

const badgeClassName = clsx('flex gap-[16px]');

export default JobPostingCard;
