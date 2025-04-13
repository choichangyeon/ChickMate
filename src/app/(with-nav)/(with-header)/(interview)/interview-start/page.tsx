import SelectInterviewerBox from '@/features/interview/select-interviewer-box';
import ResumeCard from '@/components/common/resume-card';
import Typography from '@/components/ui/typography';

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
        <div className='flex flex-row gap-5'>
          <ResumeCard resume={mockResume} />
          <ResumeCard resume={mockResume} />
          <ResumeCard resume={mockResume} />
        </div>
      </section>
    </main>
  );
};

export default InterviewStartPage;

const mockResume = {
  id: 1,
  title: '이력서 제목 조금 더 길게 작성해보자 하하하',
  userId: 'userId',
  status: 1,
  content: '이력서 내용',
  tryCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
