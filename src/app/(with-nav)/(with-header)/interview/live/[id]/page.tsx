import { getServerSession } from 'next-auth';
import Typography from '@/components/ui/typography';
import { authOptions } from '@/utils/auth-option';
import CameraView from '@/features/interview/camera-view';
import { getInterviewHistory } from '@/features/interview/api/server-services';
import QuestionDisplayWithTimer from '@/features/interview/question-display-with-timer';
import type { RouteParams } from '@/types/route-params';

const InterviewPage = async ({ params }: RouteParams) => {
  const session = await getServerSession(authOptions);
  const interviewId = Number(params.id);
  const interviewHistory = await getInterviewHistory(interviewId);
  console.log(interviewHistory);

  if (!session || !interviewHistory) return null;

  if (interviewHistory.feedback) {
    return <div>이미 완료된 면접입니다.</div>;
  }

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
      <QuestionDisplayWithTimer session={session} interviewHistory={interviewHistory} />
    </main>
  );
};

export default InterviewPage;
