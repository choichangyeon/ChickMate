import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import { useQuery } from '@tanstack/react-query';
import { getDraftResumeList } from '../api/server-services';

export const useDraftResumesQuery = () => {
  const { RESUME } = QUERY_KEY;
  const { MIN } = STALE_TIME;

  return useQuery({
    queryKey: [RESUME],
    queryFn: getDraftResumeList,
    staleTime: MIN,
  });
};
