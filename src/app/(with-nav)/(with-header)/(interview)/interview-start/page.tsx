import SelectInterviewerBox from '@/features/interview/select-interviewer-box';
import Typography from '@/components/ui/typography';
import ResumeCardsBox from '@/features/interview/resume-cards-box';

const InterviewStartPage = () => {
  // TODO: prefetch user resume datadata
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
          <ResumeCardsBox/>
      </section>
    </main>
  );
};

export default InterviewStartPage;


