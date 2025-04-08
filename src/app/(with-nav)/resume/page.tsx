import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ResumeForm from '@/features/resume/resume-form';
import UserInfoSummary from '@/features/resume/user-info-summary';
import { draftResumeOptions } from '@/features/resume/data/draft-resume-options';

export const metadata: Metadata = {
  title: '자기소개서 작성',
  description: 'Chick Mate에서 자기소개서를 관리해보세요.',
};

const ResumePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(draftResumeOptions);

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
