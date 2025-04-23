import { useInfiniteQuery } from '@tanstack/react-query';
import { getSelectedBookmark } from '@/features/bookmark-selected/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import { REFETCH_TIME } from '@/constants/time-constants';
import { AUTH_MESSAGE } from '@/constants/message-constants';
import type { UserType } from '@/types/DTO/user-dto';
const { SESSION_NO_USER } = AUTH_MESSAGE.ERROR;
const { BOOKMARK } = QUERY_KEY;
const ITEMS_PER_PAGE = 8;
const { MIN } = REFETCH_TIME;

export const useBookmarkSelectedInfiniteQuery = (userId: UserType['id']) => {
  return useInfiniteQuery({
    queryKey: [BOOKMARK, userId],
    queryFn: async ({ pageParam = 1 }) => {
      if (!userId) throw new Error(SESSION_NO_USER);
      return await getSelectedBookmark({
        pageParam,
        limit: ITEMS_PER_PAGE,
      });
    },
    enabled: !!userId,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
    refetchInterval: 5 * MIN,
    refetchIntervalInBackground: false, // 사용자가 해당 페이지에 있을 때만 refetch 실시
  });
};
