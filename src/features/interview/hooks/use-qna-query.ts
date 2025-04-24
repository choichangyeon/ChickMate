import { useQuery } from '@tanstack/react-query';
import { getInterviewHistoryAboutInProgress, getInterviewQnA } from '@/features/interview/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';

const { QNA } = QUERY_KEY;
const { MIN } = STALE_TIME;

export const useQnaQuery = (interviewId: InterviewHistoryType['id']) => {
  return useQuery({
    queryKey: [QNA],
    queryFn: () => getInterviewQnA(interviewId),
    staleTime: MIN,
  });
};
