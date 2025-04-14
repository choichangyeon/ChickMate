import Typography from '@/components/ui/typography';
import { getInterviewHistory } from '@/features/interview/api/server-services';
import CameraView from '@/features/interview/camera-view';
import { authOptions } from '@/utils/auth-option';
import { getServerSession, Session } from 'next-auth';
import type { RouteParams } from '@/types/route-params';
import InterviewPromptWithTimer from '@/features/interview/interview-prompt-with-timer';

const InterviewPage = async ({ params }: RouteParams) => {
  const session = await getServerSession(authOptions);
  const interviewId = Number(params.id);
  const interviewHistory = await getInterviewHistory(interviewId);

  if (!session) return null;

  return (
    <main className='flex flex-col gap-8'>
      <section className='flex w-full flex-col gap-4'>
        <div>
          <Typography size='2xl' weight='bold'>
            집중하세요! <span className='text-primary-orange-600'>면접이 시작됐습니다</span>
          </Typography>
        </div>
        <div className='flex gap-5'>
          <div className='flex-1'>면접관</div>
          <CameraView />
        </div>
      </section>
      {interviewHistory && <InterviewPromptWithTimer session={session} interviewHistory={interviewHistory} />}
    </main>
  );
};

export default InterviewPage;
