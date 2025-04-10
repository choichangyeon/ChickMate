import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@/features/user-meta-data/api/client-services';
import { STALE_TIME } from '@/constants/time-constants';
import { QUERY_KEY } from '@/constants/query-key';
const { A_DAY } = STALE_TIME;
const { REGIONS } = QUERY_KEY;
const useRegionsQuery = () => {
  return useQuery({
    queryKey: [REGIONS],
    queryFn: getRegions,
    staleTime: A_DAY,
  });
};

export default useRegionsQuery;
