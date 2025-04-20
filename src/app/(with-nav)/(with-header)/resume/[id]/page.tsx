import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { RESUME_STATUS } from '@/constants/resume-constants';
import { authOptions } from '@/utils/auth-option';
import Typography from '@/components/ui/typography';
import { serverActionWithSentry } from '@/utils/server-action-with-sentry';
import ResumeForm from '@/features/resume/resume-form';
import UserInfoSummary from '@/features/resume/user-info-summary';
import { getResumeById, getResumeList } from '@/features/resume/api/server-services';
import type { RouteParams } from '@/types/route-params';

export const metadata: Metadata = {
  title: '🐣ChickMate - 자기소개서',
  description: 'ChickMate에서 자기소개서를 관리해보세요.',
};

const { RESUME_DRAFT } = QUERY_KEY;
const { DRAFT } = RESUME_STATUS;

const ResumePage = async ({ params }: RouteParams) => {
  const session = await getServerSession(authOptions);
  const resumeId = Number(params.id);
  const resume = await getResumeById(resumeId);

  if (!session || !resume) return null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RESUME_DRAFT],
    queryFn: () => serverActionWithSentry(() => getResumeList(DRAFT)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='flex w-full gap-4 px-[50px] py-8'>
        <section className='flex w-full flex-col gap-4'>
          <Typography as='h2' size='2xl' weight='bold'>
            <span className='text-primary-orange-600'>자소서</span>를 작성 해 볼까요?
          </Typography>
          <ResumeForm resume={resume} />
        </section>
        <UserInfoSummary session={session} />
      </main>
    </HydrationBoundary>
  );
};

export default ResumePage;
