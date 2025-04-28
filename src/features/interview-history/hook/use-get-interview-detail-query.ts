import { useQuery } from '@tanstack/react-query';
import { getInterviewDetail } from '@/features/interview-history/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';

type Props = InterviewHistoryType['id'];

const { HISTORY } = QUERY_KEY;

export const useGetInterviewDetailQuery = (id: Props, condition: boolean = true) => {
  return useQuery({
    queryKey: [HISTORY, id],
    queryFn: () => getInterviewDetail(id),
    enabled: !!id && condition,
  });
};
