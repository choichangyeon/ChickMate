import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import { useQuery } from '@tanstack/react-query';
import { getResumeList } from '@/features/resume/api/client-services';
import { RESUME_STATUS } from '@/constants/resume-constants';

export const useSubmitResumesQuery = () => {
  const { RESUME_SUBMIT } = QUERY_KEY;
  const { MIN } = STALE_TIME;
  const { SUBMIT } = RESUME_STATUS;

  return useQuery({
    queryKey: [RESUME_SUBMIT],
    queryFn: () => getResumeList(SUBMIT),
    staleTime: MIN,
  });
};
