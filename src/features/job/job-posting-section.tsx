import { serverActionWithSentry } from '@/utils/server-action-with-sentry';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import React from 'react';
import { getJobByUserMetaData } from './api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import BlockComponent from '@/components/common/block-component';
import JobPostingsBox from './job-postings-box';

type Props = {
  session: Session | null;
};

const { JOB_POSTING } = QUERY_KEY;
const { AN_HOUR } = STALE_TIME;

const JobPostingSection = async ({ session }: Props) => {
  if (!session) {
    return (
      <section className='flex h-[400px] flex-col items-center justify-center self-stretch'>
        <BlockComponent
          firstLine='이런! 사용자 정보를 설정하지 않았네요!'
          secondLine='내 정보를 작성해볼까요?'
          thirdLine='맞춤형 채용공고는 내 정보를 기반으로 진행됩니다'
        />
      </section>
    );
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
