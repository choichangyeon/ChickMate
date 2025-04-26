'use client';

import Card from '@/components/ui/card';
import LinkButton from '@/components/ui/link-button';
import Typography from '@/components/ui/typography';
import Bookmark from '@/features/job/bookmark';
import type { JobPostingType } from '@/types/DTO/job-posting-dto';
import { formatRemainDay } from '@/utils/format-remain-day';
import { formatTimestamp } from '@/utils/format-timestamp';
import clsx from 'clsx';

type Props = {
  jobPosting: JobPostingType & { isBookmarked: boolean };
  userId: string;
};

const JobPostingCard = ({ jobPosting, userId }: Props) => {
  const { companyName, positionTitle, experienceName, expirationTimestamp, openingTimestamp, id, url, isBookmarked } =
    jobPosting;
  const postedAtDate = formatTimestamp({ input: openingTimestamp });
  const expiredAtDate = formatTimestamp({ input: expirationTimestamp });
  const remainDay = formatRemainDay(expirationTimestamp);

  return (
    <Card className='h-full p-8'>
      <article className='flex flex-col justify-between'>
        <section className='h-24'>
          <div className='flex flex-row justify-between'>
            <Typography weight='bold' color='gray-500'>
              {companyName}
            </Typography>
            <Bookmark jobPostingId={id} isBookmarked={isBookmarked} userId={userId} />
          </div>
          <Typography as='h3' weight='bold' lineClamp='2'>
            {positionTitle}
          </Typography>
          <div className='flex flex-row items-center gap-4'>
            <Typography size='sm' color='gray-500'>
              {experienceName}
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
          {url && (
            <LinkButton target='_blank' href={url} square>
              바로 가기
            </LinkButton>
          )}
        </section>
      </article>
    </Card>
  );
};

const badgeClassName = clsx('flex justify-between');

export default JobPostingCard;
