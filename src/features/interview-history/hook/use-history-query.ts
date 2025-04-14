import { QUERY_KEY } from '@/constants/query-key';
import { getInterviewHistory } from '@/features/interview-history/api/client-services';
import type { User, InterviewHistory, Resume } from '@prisma/client';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
const { HISTORY } = QUERY_KEY;

type History = InterviewHistory & {
  resumeTitle: Resume['title'];
  isFeedbackCompleted: boolean;
  createdDate: string;
};

export const useHistoryQuery = (userId: User['id'] | undefined): UseQueryResult<History[]> => {
  return useQuery({
    queryKey: [HISTORY, userId],
    queryFn: () => getInterviewHistory(userId!),
    enabled: !!userId,
  });
};
