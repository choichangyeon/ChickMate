import { useQuery } from '@tanstack/react-query';
import { getInterviewHistoryAboutInProgress } from '@/features/interview/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import type { UserType } from '@/types/DTO/user-dto';

const { IN_PROGRESS } = QUERY_KEY;
const { MIN } = STALE_TIME;

export const useInProgressQuery = (userId: UserType['id']) => {
  return useQuery({
    queryKey: [IN_PROGRESS],
    queryFn: () => getInterviewHistoryAboutInProgress({ userId }),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
