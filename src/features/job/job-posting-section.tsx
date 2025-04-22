import { serverActionWithSentry } from '@/utils/server-action-with-sentry';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import React from 'react';
import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import JobPostingsBox from '@/features/job/job-postings-box';
import { getJobByUserMetaData } from '@/features/job/api/server-services';
import { JobPostingBlockComponent } from '@/features/job/job-posting-block-component';

type Props = {
  session: Session | null;
};

const { JOB_POSTING } = QUERY_KEY;
const { AN_HOUR } = STALE_TIME;

const JobPostingSection = async ({ session }: Props) => {
  if (!session) {
    return <JobPostingBlockComponent type='unauthenticated' />;
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [JOB_POSTING, session.user.id],
    queryFn: () => serverActionWithSentry(getJobByUserMetaData),
    staleTime: AN_HOUR,
  });
  return (
    <article>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JobPostingsBox userId={session.user.id} />
      </HydrationBoundary>
    </article>
  );
};

export default JobPostingSection;
