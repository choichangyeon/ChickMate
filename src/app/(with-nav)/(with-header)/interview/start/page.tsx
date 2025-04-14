import SelectInterviewerBox from '@/features/interview/select-interviewer-box';
import Typography from '@/components/ui/typography';
import ResumeCardsBox from '@/features/interview/resume-cards-box';
import { QUERY_KEY } from '@/constants/query-key';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getResumeList } from '@/features/resume/api/client-services';
import { RESUME_STATUS } from '@/constants/resume-constants';

const InterviewStartPage = async () => {
  const { RESUME_SUBMIT } = QUERY_KEY;
  const { SUBMIT } = RESUME_STATUS;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [RESUME_SUBMIT],
    queryFn: () => getResumeList(SUBMIT),
  });
  return (
    <main className='px-12 py-8'>
      <section className='mb-8'>
        <div className='mb-4 flex flex-row'>
          <Typography as='h2' size='2xl' weight='bold'>
            면접 볼&nbsp;
          </Typography>
          <Typography as='h2' size='2xl' weight='bold' color='primary-600'>
            ChickMate
          </Typography>
          <Typography as='h2' size='2xl' weight='bold'>
            를 제출하세요
          </Typography>
        </div>
        <SelectInterviewerBox />
      </section>
      <section>
        <div className='mb-4 flex flex-row'>
          <Typography as='h2' size='2xl' weight='bold'>
            면접 볼&nbsp;
          </Typography>
          <Typography as='h2' size='2xl' weight='bold' color='primary-600'>
            자소서
          </Typography>
          <Typography as='h2' size='2xl' weight='bold'>
            를 제출하세요
          </Typography>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ResumeCardsBox />
        </HydrationBoundary>
      </section>
    </main>
  );
};

export default InterviewStartPage;
