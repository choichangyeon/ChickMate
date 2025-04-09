import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { serverActionWithSentry } from '@/utils/server-action-with-sentry';
import ResumeForm from '@/features/resume/resume-form';
import UserInfoSummary from '@/features/resume/user-info-summary';
import { getDraftResumeList } from '@/features/resume/api/server-services';

export const metadata: Metadata = {
  title: '자기소개서 작성',
  description: 'Chick Mate에서 자기소개서를 관리해보세요.',
};

const ResumePage = async () => {
  const { RESUME } = QUERY_KEY;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [RESUME],
    queryFn: () => serverActionWithSentry(getDraftResumeList),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex gap-2'>
        <ResumeForm />
        <UserInfoSummary />
      </div>
    </HydrationBoundary>
  );
};

export default ResumePage;
