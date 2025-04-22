'use client';

import JobPostingCard from '@/features/job/job-posting-card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { QUERY_KEY } from '@/constants/query-key';
import { useJobPostingQuery } from '@/features/job/hooks/use-job-posting-query';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { useQueryClient } from '@tanstack/react-query';
import { JobPostingBlockComponent } from '@/features/job/job-posting-block-component';

type Props = {
  userId: string;
};

const { META_DATA } = QUERY_KEY;

const JobPostingsBox = ({ userId }: Props) => {
  const queryClient = useQueryClient();
  const userMetaData = queryClient.getQueryData([META_DATA, userId]) as UserMetaDataType;

  if (!userMetaData) return <JobPostingBlockComponent type='no-profile' />;

  const { data: jobPostingList, isError, isPending } = useJobPostingQuery({ userMetaData, userId });

  if (isPending) {
    return (
      <section className='flex h-[400px] flex-col items-center justify-center self-stretch'>
        <LoadingSpinner size='lg' />
      </section>
    );
  }

  if (isError) return <JobPostingBlockComponent type='fetch-error' />;

  if (!jobPostingList || jobPostingList.length === 0) return <JobPostingBlockComponent type='no-job-data' />;

  return (
    // TODO: 무한 스크롤 구현
    <section className='flex flex-row flex-wrap gap-5 self-stretch scrollbar-hide'>
      {jobPostingList.map((jobPosting) => (
        <JobPostingCard key={jobPosting.id} userId={userId} jobPosting={jobPosting}></JobPostingCard>
      ))}
    </section>
  );
};

export default JobPostingsBox;
