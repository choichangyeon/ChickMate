'use client';

import Card from '@/components/ui/card';
import LinkButton from '@/components/ui/link-button';
import Typography from '@/components/ui/typography';
import Bookmark from '@/features/job/bookmark';
import type { JobPostingType } from '@/types/DTO/job-posting-dto';
import { formatRemainDay } from '@/utils/format-remain-day';
import { formatTimestamp } from '@/utils/format-timestamp';

type Props = {
  jobPosting: JobPostingType & { isBookmarked: boolean };
  userId: string;
};

const JobPostingCard = ({ jobPosting, userId }: Props) => {
  const {
    companyName,
    positionTitle,
    experienceName,
    expirationTimestamp,
    openingTimestamp,
    keyword,
    id,
    url,
    isBookmarked,
  } = jobPosting;

  const postedAtDate = formatTimestamp({ input: openingTimestamp });
  const expiredAtDate = formatTimestamp({ input: expirationTimestamp });
  const remainDay = formatRemainDay(expirationTimestamp);

  return (
    <Card className='flex-shrink-1 flex h-full w-full min-w-0 flex-col justify-between p-8'>
      <dl>
        <div className='flex w-full justify-between'>
          <dt className='sr-only'>기업 명</dt>
          <dd className='font-bold text-gray-500'>{companyName}</dd>
          <dt className='sr-only'>북마크 {isBookmarked ? '추가' : '해제'}</dt>
          <dd>
            <Bookmark jobPostingId={id} isBookmarked={isBookmarked} userId={userId} />
          </dd>
        </div>
        <dt className='sr-only'>공고 제목</dt>
        <dd className='font-bold'>{positionTitle}</dd>
        {keyword && (
          <>
            <dt className='sr-only'>채용 분야</dt>
            <dd className='text-cool-gray-500'>{keyword}</dd>
          </>
        )}
        <div>
          <dt className='sr-only'>채용 조건</dt>
          <dd className='text-sm text-cool-gray-500'> {experienceName}</dd>
          <dt className='sr-only'>채용 기간</dt>
          <dd className='text-sm text-cool-gray-500'>
            {postedAtDate} ~ {expiredAtDate}
          </dd>
        </div>
      </dl>

      <dl className='mt-2 flex items-center justify-between'>
        {remainDay ? (
          <>
            <dt className='sr-only'>마감 기한</dt>
            <dd>
              <Typography as='span' className='text-xl font-bold text-primary-orange-600 mobile:text-base'>
                D-{remainDay}
              </Typography>
            </dd>
          </>
        ) : (
          <dd>
            <Typography color='primary-600' weight='bold' size='xl'>
              날짜정보 오류
            </Typography>
          </dd>
        )}
        {url && (
          <>
            <dt className='sr-only'>채용 공고 페이지 이동</dt>
            <dd>
              <LinkButton target='_blank' href={url} square>
                바로 가기
              </LinkButton>
            </dd>
          </>
        )}
      </dl>
    </Card>
  );
};

export default JobPostingCard;
