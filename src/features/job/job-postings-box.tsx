'use client';

import JobPostingCard from '@/features/job/job-posting-card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { QUERY_KEY } from '@/constants/query-key';
import { useJobPostingQuery } from '@/features/job/hooks/use-job-posting-query';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { useQueryClient } from '@tanstack/react-query';
import { JobPostingBlockComponent } from '@/features/job/job-posting-block-component';
import { useState } from 'react';
import Typography from '@/components/ui/typography';

type Props = {
  userId: string;
};

export type SortOption = 'latest' | 'oldest' | 'deadline' | 'company' | 'bookmark';

const { META_DATA } = QUERY_KEY;

const JobPostingsBox = ({ userId }: Props) => {
  const queryClient = useQueryClient();
  const userMetaData = queryClient.getQueryData([META_DATA, userId]) as UserMetaDataType;

  if (!userMetaData) return <JobPostingBlockComponent type='no-profile' />;

  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const { data: jobPostingList, isError, isPending } = useJobPostingQuery({ userMetaData, userId, sortOption });

  return (
    <>
      <div className='mb-4 self-end'>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
          className='rounded-md border px-2 py-1 text-sm shadow-sm'
        >
          <option value='latest'>최신순</option>
          <option value='oldest'>오래된 순</option>
          <option value='deadline'>마감 임박 순</option>
          <option value='company'>기업명 순</option>
          <option value='bookmark'>북마크한 공고</option>
        </select>
      </div>

      {isPending ? (
        <section className='flex h-[400px] flex-col items-center justify-center self-stretch gap-4'>
          <LoadingSpinner size='lg' />
          <Typography>채용 공고를 불러오는 중...</Typography>
        </section>
      ) : isError ? (
        <JobPostingBlockComponent type='fetch-error' />
      ) : !jobPostingList ? (
        <JobPostingBlockComponent type='no-job-data' />
      ) : jobPostingList.length === 0 ? (
        <JobPostingBlockComponent type='no-bookmark' />
      ) : (
        <section className='flex flex-row flex-wrap gap-5 self-stretch scrollbar-hide'>
          {jobPostingList.map((jobPosting) => (
            <JobPostingCard key={jobPosting.id} userId={userId} jobPosting={jobPosting} />
          ))}
        </section>
      )}
    </>
  );
};

export default JobPostingsBox;
