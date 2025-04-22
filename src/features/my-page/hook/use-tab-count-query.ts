import type { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getTabCount } from '@/features/my-page/api/client-services';
import { STALE_TIME } from '@/constants/time-constants';
import { QUERY_KEY } from '@/constants/query-key';
const { TABS_COUNT } = QUERY_KEY;
const { A_DAY } = STALE_TIME;

export const useTabCountQuery = (
  userId: User['id'] | null,
  initialData?: {
    resumes: number;
    interviewHistories: number;
    userSelectedJobs: number;
  }
) => {
  return useQuery({
    queryKey: [TABS_COUNT],
    queryFn: () => getTabCount(userId!),
    enabled: !!userId,
    staleTime: A_DAY,
    initialData,
  });
};
