'use client';

import Card from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import BookmarkComponent from '@/features/job/bookmark-component';
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
  const { company, title, experienceType, expiredAt, postedAt, id } = jobPosting;
  const postedAtDate = formatDate({ input: postedAt });
  const expiredAtDate = formatDate({ input: expiredAt });
  return (
    <Card>
      {iconButton && (
        // TODO: iconButton component 적용
        <BookmarkComponent jobPostingId={id} />
      )}
      <div>
        <Typography weight='bold' color='gray-500'>
          {company}
        </Typography>
        <Typography as='h3' weight='bold' lineClamp='2'>
          {title}
        </Typography>
        <div className='flex flex-row items-center gap-4'>
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
