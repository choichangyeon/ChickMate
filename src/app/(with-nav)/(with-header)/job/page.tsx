import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import { getJobByUserMetaData } from '@/features/job/api/client-services';
import JobPostingCard from '@/components/common/job-posting-card';
import { getUserMetaData } from '@/features/user-meta-data/api/client-services';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { authOptions } from '@/utils/auth-option';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import JobPostingsBox from '@/features/job/job-postings-box';
import Typography from '@/components/ui/typography';

const { JOB_POSTING } = QUERY_KEY;
const { AN_HOUR } = STALE_TIME;

const JobPage = async () => {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;

  await queryClient.prefetchQuery({
    queryKey: [JOB_POSTING],
    queryFn: async () => {
      const userMetaData: UserMetaDataType = await getUserMetaData(user?.id);
      return getJobByUserMetaData(userMetaData);
    },
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
          {user && <JobPostingsBox userId={user.id} />}
        </HydrationBoundary>
      </article>
    </main>
  );
};

export default JobPage;
