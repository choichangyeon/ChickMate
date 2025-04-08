import { QUERY_KEY } from '@/constants/query-key';
import { GC_TIME, STALE_TIME } from '@/constants/time-constants';
import { useQuery } from '@tanstack/react-query';
import { getSample } from '../api/client-services';

/**
 * @refetchOnWindowFocus { boolean }
 * @refetchOnReconnect { boolean }
 * @refetchOnMount { boolean }
 */
export const useGetSampleQuery = (prop) => {
  return useQuery({
    queryKey: [QUERY_KEY.SAMPLE, prop],
    queryFn: getSample,
    staleTime: STALE_TIME.MIN,
    gcTime: GC_TIME.SAMPLE,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: 1000 * 60, // stale이든 아니든 주기적으로 refetch가 필요할 경우
    retry: 0,
  });
};
