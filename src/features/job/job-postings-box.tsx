'use client';

import JobPostingCard from '@/features/job/job-posting-card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { QUERY_KEY } from '@/constants/query-key';
import { useJobPostingQuery } from '@/features/job/hooks/use-job-posting-query';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { useQueryClient } from '@tanstack/react-query';
import { JobPostingBlockComponent } from '@/features/job/job-posting-block-component';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
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

  // 새로 고침 시 option 유지되도록
  // 없을 시 새로고침 시 initialSort가 'latest'로 나옴
  const { sortOption: initialSort, page: initialPage } = useMemo(() => sanitizeQueryParams(params), [params]);

  const [sortOption, setSortOption] = useState<SortOption>((initialSort as SortOption) || 'latest');
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

  return (
    <>
      <JobPostingSelectBox sortOption={sortOption} changeNewParams={changeNewParams} />

      {isPending ? (
        <section className='flex h-[400px] flex-col items-center justify-center gap-4 self-stretch'>
          <LoadingSpinner size='lg' />
          <Typography>채용 공고를 불러오는 중...</Typography>
        </section>
      ) : isError ? (
        <JobPostingBlockComponent type='fetch-error' />
      ) : !data.jobPostingList ? (
        <JobPostingBlockComponent type='no-job-data' />
      ) : data.jobPostingList.length === 0 ? (
        <JobPostingBlockComponent type='no-bookmark' />
      ) : (
        <div className='flex flex-col items-center justify-between gap-6'>
          <section className='flex flex-wrap gap-5 self-stretch scrollbar-hide'>
            {data.jobPostingList.map((jobPosting) => (
              <JobPostingCard key={jobPosting.id} userId={userId} jobPosting={jobPosting} />
            ))}
          </section>

          <JobPostingPaginationButton totalCount={data.totalCount} page={page} setPage={setPage} />
        </div>
      )}
    </>
  );
};

export default JobPostingsBox;
