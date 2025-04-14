import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import { useQuery } from '@tanstack/react-query';
import { getResumeList } from '@/features/resume/api/client-services';
import { RESUME_STATUS } from '@/constants/resume-constants';

export const useDraftResumesQuery = () => {
  const { RESUME_DRAFT } = QUERY_KEY;
  const { MIN } = STALE_TIME;
  const { DRAFT } = RESUME_STATUS;

  return useQuery({
    queryKey: [RESUME_DRAFT],
    queryFn: () => getResumeList(DRAFT),
    staleTime: MIN,
  });
};
