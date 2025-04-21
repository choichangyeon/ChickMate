import { QUERY_KEY } from '@/constants/query-key';
import { InterviewHistory } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getInterviewDetail } from '@/features/interview-history/api/client-services';

type Props = InterviewHistory['id'];

const { HISTORY } = QUERY_KEY;

export const useGetInterviewDetailQuery = (id: Props) => {
  return useQuery({
    queryKey: [HISTORY, id],
    queryFn: () => getInterviewDetail(id),
    enabled: !!id,
  });
};
