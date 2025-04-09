import { useQuery } from '@tanstack/react-query';
import { getBookmarkByJobPostingId } from '@/features/job/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import { STALE_TIME } from '@/constants/time';

const { BOOKMARK } = QUERY_KEY;
const { MIN } = STALE_TIME;

type Props = {
  jobPostingId: number;
};

export const useBookmarkQuery = ({ jobPostingId }: Props) => {
  return useQuery({
    queryKey: [BOOKMARK, jobPostingId],
    queryFn: () => getBookmarkByJobPostingId({ jobPostingId }),
    staleTime: MIN,
  });
};
