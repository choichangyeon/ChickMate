import type { User } from '@prisma/client';
import { QUERY_KEY } from '@/constants/query-key';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSelectedBookmark } from '@/features/bookmark-selected/api/client-services';
import { REFETCH_TIME } from '@/constants/time-constants';
const { BOOKMARK } = QUERY_KEY;
const ITEMS_PER_PAGE = 8;
const { MIN } = REFETCH_TIME;

export const useBookmarkSelectedInfiniteQuery = (userId: User['id']) => {
  return useInfiniteQuery({
    queryKey: [BOOKMARK, userId],
    queryFn: async ({ pageParam = 1 }) =>
      await getSelectedBookmark({
        pageParam,
        limit: ITEMS_PER_PAGE,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
    refetchInterval: 5 * MIN,
    refetchIntervalInBackground: false, // 사용자가 해당 페이지에 있을 때만 refetch 실시
  });
};
