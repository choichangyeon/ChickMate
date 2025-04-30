import SelectInterviewerBox from '@/features/interview/select-interviewer-box';
import Typography from '@/components/ui/typography';
import ResumeCardsBox from '@/features/interview/resume-cards-box';
import { QUERY_KEY } from '@/constants/query-key';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { RESUME_STATUS } from '@/constants/resume-constants';
import AlertInProgress from '@/features/interview/alert-in-progress';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import ResumeAllButton from '@/features/interview/resume-all-button';
import { Metadata } from 'next';
import { getResumeList } from '@/features/resume/api/server-services';

export const metadata: Metadata = {
  title: 'AI 면접',
  description: 'ChickMate에서 AI와 함께 면접을 진행해보세요.',
};

const InterviewStartPage = async () => {
  const { RESUMES } = QUERY_KEY;
  const { SUBMIT } = RESUME_STATUS;

  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    queryKey: [RESUMES],
    queryFn: () => getResumeList(SUBMIT),
  });

  return (
    <article className='mobile:flex-wrap mobile:pb-[56px]'>
      {session && <AlertInProgress session={session} />}
      <div className='mb-8'>
        <div className='mb-4 flex flex-row mobile:hidden'>
          <Typography as='h2' size='2xl' weight='bold'>
            면접 볼&nbsp;
            <span className='text-primary-orange-600'>ChickMate</span>를 선택해 주세요
          </Typography>
        </div>
        <div className='mb-4 hidden mobile:flex'>
          <Typography as='h2' size='xl' weight='bold'>
            면접 볼&nbsp;
            <span className='text-primary-orange-600'>ChickMate</span>를 선택해 주세요
          </Typography>
        </div>
        <SelectInterviewerBox session={session} />
      </div>
      <div className='mobile:mb-2'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className='mb-4 flex flex-row gap-4 mobile:gap-2'>
            <div className='mobile:hidden'>
              <Typography as='h2' size='2xl' weight='bold'>
                면접 볼&nbsp;
                <span className='text-primary-orange-600'>자소서</span>를 선택해 주세요
              </Typography>
            </div>
            <div className='hidden flex-col mobile:flex'>
              <Typography as='h2' size='xl' weight='bold'>
                면접 볼&nbsp;
                <span className='text-primary-orange-600'>자소서</span>를 선택해 주세요
              </Typography>
            </div>
            <ResumeAllButton session={session} />
          </div>
          <ResumeCardsBox session={session} />
        </HydrationBoundary>
      </div>
    </article>
  );
};

export default InterviewStartPage;
