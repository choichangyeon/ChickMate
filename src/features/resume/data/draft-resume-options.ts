import { queryOptions } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import { getDraftResumeList } from '@/features/resume/api/server-services';

const { RESUME } = QUERY_KEY;
const { MIN } = STALE_TIME;

export const draftResumeOptions = queryOptions({
  queryKey: [RESUME],
  queryFn: getDraftResumeList,
  staleTime: MIN,
});
