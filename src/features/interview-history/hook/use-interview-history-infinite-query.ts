import type { User } from '@prisma/client';
import { QUERY_KEY } from '@/constants/query-key';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getInterviewHistories } from '@/features/interview-history/api/client-services';
import { useEffect, useRef } from 'react';
const { HISTORY } = QUERY_KEY;
const ITEMS_PER_PAGE = 8;
const REFETCH_INTERVAL = 1000 * 30; // 30초

export const useInterviewHistoryInfiniteQuery = (userId: User['id']) => {
  const pendingFeedbackIds = useRef<Set<number>>(new Set());

  const query = useInfiniteQuery({
    queryKey: [HISTORY, userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getInterviewHistories({
        userId,
        pageParam,
        limit: ITEMS_PER_PAGE,
      });
      response.histories.forEach((history) => {
        const historyId = history.id;

        if (!history.isFeedbackCompleted) {
          // 피드백이 완료되지 않은 항목은 Set에 추가
          pendingFeedbackIds.current.add(historyId);
        } else {
          // 피드백이 완료된 항목은 Set에서 제거
          pendingFeedbackIds.current.delete(historyId);
        }
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
    refetchInterval: () => {
      return pendingFeedbackIds.current.size > 0 ? REFETCH_INTERVAL : false; // '평가 중' 상태가 하나라도 있을 때 refetch를 함
    },
    refetchIntervalInBackground: false, // 사용자가 해당 페이지에 있을 때만 refetch 실시
  });

  // 데이터가 업데이트될 때마다 Set 정리
  useEffect(() => {
    if (query.data) {
      const histories = query.data.pages.flatMap((page) => page.histories);
      const currentIds = new Set(histories.map((history) => history.id));

      // Set에서 더 이상 존재하지 않는 ID 제거
      Array.from(pendingFeedbackIds.current).forEach((id) => {
        if (!currentIds.has(id)) {
          pendingFeedbackIds.current.delete(id);
        }
      });
    }
  }, [query.data]);

  // 컴포넌트 언마운트 시 Set 초기화
  useEffect(() => {
    return () => {
      pendingFeedbackIds.current.clear();
    };
  }, []);

  return query;
};
