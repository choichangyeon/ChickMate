'use client';

import JobPostingCard from '@/features/job/job-posting-card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { QUERY_KEY } from '@/constants/query-key';
import { useJobPostingQuery } from '@/features/job/hooks/use-job-posting-query';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import { useQueryClient } from '@tanstack/react-query';
import { JobPostingBlockComponent } from '@/features/job/job-posting-block-component';
import { ChangeEvent, useEffect, useState } from 'react';
import Typography from '@/components/ui/typography';
import JobPostingPaginationButton from '@/features/job/job-posting-pagination-button';
import { useRouter, useSearchParams } from 'next/navigation';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { PATH } from '@/constants/path-constant';
import JobPostingSelectBox from '@/features/job/job-posting-select-box';

type Props = {
  userId: string;
};

export type SortOption = 'latest' | 'oldest' | 'deadline' | 'company' | 'bookmark';

const { JOB } = PATH;
const { META_DATA } = QUERY_KEY;
export const JOB_POSTING_DATA_LIMIT = 15;

const JobPostingsBox = ({ userId }: Props) => {
  const queryClient = useQueryClient();
  const userMetaData = queryClient.getQueryData([META_DATA, userId]) as UserMetaDataType;

  if (!userMetaData) return <JobPostingBlockComponent type='no-profile' />;
  const params = useSearchParams();
  const router = useRouter();

  const { sortOption: initialSort, page: initialPage } = sanitizeQueryParams(params);
  const [sortOption, setSortOption] = useState<SortOption>((initialSort as SortOption) || 'deadline');
  const [page, setPage] = useState(Number(initialPage) || 1);

  const { data, isError, isPending } = useJobPostingQuery({
    userMetaData,
    userId,
    sortOption,
    page,
    limit: JOB_POSTING_DATA_LIMIT,
  });

  useEffect(() => {
    const { sortOption, page } = sanitizeQueryParams(params);
    setSortOption(sortOption as SortOption);
    setPage(Number(page) || 1);
  }, [params]);

  const changeNewParams = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption as SortOption);
    router.push(`${JOB}?sortOption=${newSortOption}&page=1`);
  };

  const renderContent = () => {
    if (isPending) {
      return (
        <section className='flex h-[400px] flex-col items-center justify-center gap-4 self-stretch'>
          <LoadingSpinner size='lg' />
          <Typography>채용 공고를 불러오는 중...</Typography>
        </section>
      );
    }

    if (isError) {
      return <JobPostingBlockComponent type='fetch-error' />;
    }

    if (!data?.jobPostingList) {
      return <JobPostingBlockComponent type='no-job-data' />;
    }

    if (data.jobPostingList.length === 0) {
      return <JobPostingBlockComponent type='no-bookmark' />;
    }

    return (
      <>
        <ul className='grid gap-2 grid-cols-[repeat(auto-fill,_minmax(380px,_1fr))]'>
          {data.jobPostingList.map((jobPosting) => (
            <JobPostingCard key={jobPosting.id} userId={userId} jobPosting={jobPosting} />
          ))}
        </ul>
        <JobPostingPaginationButton totalCount={data.totalCount} page={page} setPage={setPage} />
      </>
    );
  };

  return (
    <>
      <JobPostingSelectBox sortOption={sortOption} changeNewParams={changeNewParams} />
      {renderContent()}
    </>
  );
};

export default JobPostingsBox;
