import { useQuery } from '@tanstack/react-query';
import { getBookmarkByJobPostingId } from '@/features/job/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time-constants';

const { JOB_POSTING, BOOKMARK } = QUERY_KEY;
const { MIN } = STALE_TIME;

type Props = {
  jobPostingId: number;
};

export const useBookmarkQuery = ({ jobPostingId }: Props) => {
  return useQuery({
    // TODO: JobPosting과 BookMark queryKey 재설정 필요 - 불필요한 cache context가 너무 많이 생김
    queryKey: [BOOKMARK, jobPostingId],
    queryFn: () => getBookmarkByJobPostingId({ jobPostingId }),
    staleTime: MIN,
  });
};
