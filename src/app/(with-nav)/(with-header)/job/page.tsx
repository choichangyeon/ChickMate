import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import { getJobByUserMetaData } from '@/features/job/api/client-services';
import BookmarkComponent from '@/features/job/bookmark-component';
import JobPostingCard from '@/components/common/job-posting-card';
import { getUserMetaData } from '@/features/user-meta-data/api/client-services';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { authOptions } from '@/utils/auth-option';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import JobPostingsBox from '@/features/job/job-postings-box';

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      JobPage
      {user && <JobPostingsBox userId={user.id} />}
      {/* <JobPostingCard jobPosting={mockJobPosting} iconButton={true}></JobPostingCard> */}
    </HydrationBoundary>
  );
};

export default JobPage;

const mockJobPosting = {
  id: 1,
  company: '삼성전자',
  title: '삼성전자 신입사원 모집',
  experienceType: '신입',
  expiredAt: new Date('2023-12-31'),
  postedAt: new Date('2023-01-01'),
  jobType: '의료',
  location: {
    mainRegion: '서울',
    subRegion: '강남구',
  },
  educationLevel: '대졸(4년)',
  url: 'https://www.samsung.com/sec/careers/',
  employmentType: '정규직',
  createdAt: new Date(),
};
