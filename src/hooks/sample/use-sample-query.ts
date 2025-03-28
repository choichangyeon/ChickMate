import { QUERY_KEY } from '@/constants/query-key';
import { GC_TIME, STALE_TIME } from '@/constants/time';
import { useQuery } from '@tanstack/react-query';

const getSampleData = async ({ prop }: { prop: any }) => {
  const res = await fetch(`/api/home/${prop}`);
  const data = await res.json();

  return data;
};

/**
 * @refetchOnWindowFocus { boolean }
 * @refetchOnReconnect { boolean }
 * @refetchOnMount { boolean }
 */
export const useSampleQuery = ({ prop }: { prop: any }) => {
  return useQuery({
    queryKey: [QUERY_KEY.SAMPLE, prop],
    queryFn: () => getSampleData(prop),
    staleTime: STALE_TIME.MIN,
    gcTime: GC_TIME.SAMPLE,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: 1000 * 60, // stale이든 아니든 주기적으로 refetch가 필요할 경우
  });
};
