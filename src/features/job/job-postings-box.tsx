'use client';

import JobPostingCard from '@/components/common/job-posting-card';
import { useJobPostingQuery } from '@/features/job/hooks/use-job-posting-query';

type Props = {
  userId: string;
};

const JobPostingsBox = (userId: Props) => {
  const { data: jobPostingList, isLoading, isError } = useJobPostingQuery(userId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading job postings</div>;
  if (!jobPostingList || jobPostingList.length === 0) {
    return <div>No job postings available</div>;
  }

  return (
    <section className='flex max-w-[100vw] flex-row flex-nowrap gap-5 overflow-x-auto scrollbar-hide'>
      {jobPostingList.map((jobPosting) => (
        <JobPostingCard key={jobPosting.id} jobPosting={jobPosting}></JobPostingCard>
      ))}
    </section>
  );
};

export default JobPostingsBox;
