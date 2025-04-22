import { QUERY_KEY } from '@/constants/query-key';
import { getInterviewHistories } from '@/features/interview-history/api/client-services';
import type { User } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
const { HISTORY } = QUERY_KEY;
const ITEMS_PER_PAGE = 8;

export const useInterviewHistoryInfiniteQuery = (userId: User['id']) => {
  return useInfiniteQuery({
    queryKey: [HISTORY, userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getInterviewHistories({
        userId,
        pageParam,
        limit: ITEMS_PER_PAGE,
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
    refetchIntervalInBackground: false,
  });
};
