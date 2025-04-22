import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';
import { getResume } from '@/features/resume/api/client-services';
import { useQuery } from '@tanstack/react-query';

const { RESUMES } = QUERY_KEY;
const { MIN } = STALE_TIME;

export const useResumeQuery = (resumeId: number) => {
  return useQuery({
    queryKey: [RESUMES, resumeId],
    queryFn: () => getResume(resumeId),
    staleTime: MIN,
  });
};
