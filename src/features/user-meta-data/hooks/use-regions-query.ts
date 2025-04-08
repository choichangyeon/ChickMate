import { useQuery } from '@tanstack/react-query';
import { getRegions } from '../api/client-services';
import { STALE_TIME } from '@/constants/time';
import { META_DATA_QUERY_KEY } from '@/constants/query-key';
const { A_DAY } = STALE_TIME;
const { REGIONS } = META_DATA_QUERY_KEY;
const useRegionsQuery = () => {
  return useQuery({
    queryKey: [REGIONS],
    queryFn: getRegions,
    staleTime: A_DAY,
  });
};

export default useRegionsQuery;
