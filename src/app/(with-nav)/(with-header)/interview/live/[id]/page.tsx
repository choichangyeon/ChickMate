import Typography from '@/components/ui/typography';
import { getInterviewHistory } from '@/features/interview/api/server-services';
import CameraView from '@/features/interview/camera-view';
import Timer from '@/features/interview/timer';
import type { RouteParams } from '@/types/route-params';

const InterviewPage = async ({ params }: RouteParams) => {
  const interviewId = Number(params.id);
  const interviewHistory = await getInterviewHistory(interviewId);

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

      <section className='flex gap-5'>
        <div className='flex flex-col items-start gap-4'>
          <div>불타는 면접관</div>
          <div className='px-16'>
            <Typography color='gray-700'>
              자소서 내용중에 어처구니 없는 내용이 있어 해당 부분에 관해 질문드리겠습니다 이러이러한 내용을 적어주셨는데
              이 답변이 정말 최선인가요? 확인차 질문드립니다. 해당 부분에 대해서 말씀해주세요 자소서 내용중에 어처구니
              없는 내용이 있어 해당 부분에 관해 질문드리겠습니다 이러이러한 내용을 적어주셨는데 이 답변이 정말
              최선인가요? 확인차 질문드립니다. 해당 부분에 대해서 말씀해주세요
            </Typography>{' '}
          </div>
        </div>
        <Timer />
      </section>
    </main>
  );
};

export default InterviewPage;
