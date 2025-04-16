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

  if (!session || !interviewHistory) return null;

  if (interviewHistory.feedback) {
    return <div>이미 완료된 면접입니다.</div>;
  }

  return (
    <main className='flex flex-col gap-8 px-[50px] py-8'>
      <section className='flex w-full flex-col gap-4'>
        <div className='flex'>
          <Typography size='2xl' weight='bold'>
            집중하세요! <span className='text-primary-orange-600'>면접이 시작됐습니다</span>
          </Typography>
          <span className='flex h-[24px] w-[40px] items-center justify-center rounded-full border-2 border-primary-orange-700 bg-primary-orange-600 px-[10px] text-white'>
            Q1
          </span>
        </div>
        <div className='flex h-[335px] gap-5'>
          <div className='flex-1 rounded-lg border border-cool-gray-200 bg-white'>면접관</div>
          <CameraView />
        </div>
      </section>
      <QuestionDisplayWithTimer session={session} interviewHistory={interviewHistory} />
    </main>
  );
};

export default InterviewPage;
