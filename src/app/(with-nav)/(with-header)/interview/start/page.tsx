import SelectInterviewerBox from '@/features/interview/select-interviewer-box';
import Typography from '@/components/ui/typography';
import ResumeCardsBox from '@/features/interview/resume-cards-box';
import { QUERY_KEY } from '@/constants/query-key';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getResumeList } from '@/features/resume/api/client-services';
import { RESUME_STATUS } from '@/constants/resume-constants';
import { getInterviewHistoryAboutInProgress } from '@/features/interview/api/server-services';
import AlertInProgress from '@/features/interview/alert-in-progress';

const InterviewStartPage = async () => {
  const { RESUME_SUBMIT } = QUERY_KEY;
  const { SUBMIT } = RESUME_STATUS;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [RESUME_SUBMIT],
    queryFn: () => getResumeList(SUBMIT),
  });
  await getInterviewHistoryAboutInProgress();

  return (
    <>
      <AlertInProgress />
      <article className='mb-8'>
        <section className='mb-4 flex flex-row'>
          <Typography as='h2' size='2xl' weight='bold'>
            면접 볼&nbsp;
            <span className='text-primary-orange-600'>ChickMate</span>를 선택해 주세요
          </Typography>
        </section>
        <SelectInterviewerBox />
      </article>
      <article>
        <section className='mb-4 flex flex-row'>
          <Typography as='h2' size='2xl' weight='bold'>
            면접 볼&nbsp;
            <span className='text-primary-orange-600'>자소서</span>를 선택해 주세요
          </Typography>
        </section>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ResumeCardsBox />
        </HydrationBoundary>
      </article>
    </>
  );
};

export default InterviewStartPage;
