import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import { authOptions } from '@/utils/auth-option';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import JobPostingsBox from '@/features/job/job-postings-box';
import Typography from '@/components/ui/typography';
import { getJobByUserMetaData } from '@/features/job/api/server-services';
import { serverActionWithSentry } from '@/utils/server-action-with-sentry';
import Button from '@/components/ui/button';

const { JOB_POSTING } = QUERY_KEY;
const { AN_HOUR } = STALE_TIME;
const SARAMIN_URL = 'http://www.saramin.co.kr';

const JobPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const user = session.user;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [JOB_POSTING, user.id],
    queryFn: () => serverActionWithSentry(getJobByUserMetaData),
    staleTime: AN_HOUR,
  });

  return (
    <main className='px-12 py-8'>
      <section className='mb-4'>
        <Typography color='primary-600' as='h1' size='3xl' weight='bold'>
          맞춤형
          <span className='text-cool-gray-900'> 채용공고</span>
        </Typography>
        <Typography color='gray-500' size='xl'>
          프로필에 작성된 정보를 통해 맞춤형 채용공고를 추천해드립니다
        </Typography>
      </section>
      <article>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <JobPostingsBox userId={user.id} />
        </HydrationBoundary>
      </article>
      <footer className='mt-4'>
        <Button link href={SARAMIN_URL} target='_blank'>
          데이터 출처: 취업 사람인
        </Button>
      </footer>
    </main>
  );
};

export default JobPage;
