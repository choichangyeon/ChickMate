'use client';

import Card from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import Bookmark from '@/features/job/bookmark';
import { formatDate } from '@/utils/format-date';
import { JobPosting } from '@prisma/client';
import clsx from 'clsx';
import Button from '@/components/ui/button';
import { formatRemainDay } from '@/utils/format-remain-day';

type Props = {
  jobPosting: JobPosting;
};

const JobPostingCard = ({ jobPosting }: Props) => {
  const { company, title, experienceType, expiredAt, postedAt, id, url } = jobPosting;
  const postedAtDate = formatDate({ input: postedAt });
  const expiredAtDate = formatDate({ input: expiredAt });
  const remainDay = formatRemainDay(expiredAt);

  return (
    <Card className='h-full min-w-96 p-8'>
      <article className='flex flex-col justify-between'>
        <section className='h-24'>
          <div className='flex flex-row justify-between'>
            <Typography weight='bold' color='gray-500'>
              {company}
            </Typography>
            {/* TODO: iconButton component 적용 */}
            <Bookmark jobPostingId={id} />
          </div>
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
        </section>
        <section className={badgeClassName}>
          {remainDay ? (
            <Typography color='primary-600' weight='bold' size='xl'>
              D-{remainDay}
            </Typography>
          ) : (
            <Typography color='primary-600' weight='bold' size='xl'>
              날짜정보 오류
            </Typography>
          )}
          {url ? (
            <Button target='_blank' link href={url} variant='outline' color='dark' square>
              바로 가기
            </Button>
          ) : (
            <Button disabled variant='outline' color='dark' square>
              페이지 접근 불가
            </Button>
          )}
        </section>
      </article>
    </Card>
  );
};

const badgeClassName = clsx('flex justify-between');

export default JobPostingCard;
