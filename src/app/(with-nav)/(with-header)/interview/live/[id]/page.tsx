import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { getInterviewHistory, getInterviewQnA } from '@/features/interview/api/server-services';
import type { RouteParams } from '@/types/route-params';
import { INTERVIEW_HISTORY_STATUS } from '@/constants/interview-constants';
import InterviewBlockComponent from '@/features/interview/interview-block-component';
import InterviewClient from '@/features/interview/interview-client';

export const metadata: Metadata = {
  title: 'AI 면접',
  description: 'ChickMate에서 AI와 함께 면접을 진행해보세요.',
};

const InterviewPage = async ({ params }: RouteParams) => {
  const session = await getServerSession(authOptions);
  if (!session) return <InterviewBlockComponent type='unauthenticated' />;

  const interviewId = Number(params.id);
  const interviewHistory = await getInterviewHistory(interviewId);
  const interviewQnAList = await getInterviewQnA(interviewId);

  if (!interviewHistory) return <InterviewBlockComponent type='getInterviewHistoryError' />;

  if (interviewHistory.status === INTERVIEW_HISTORY_STATUS.COMPLETED) {
    return <InterviewBlockComponent type='completedPageError' />;
  }

  return <InterviewClient interviewHistory={interviewHistory} interviewQnAList={interviewQnAList} />;
};

export default InterviewPage;
