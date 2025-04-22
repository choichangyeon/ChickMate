import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getJobByUserMetaData } from '@/features/job/api/client-services';
import { STALE_TIME } from '@/constants/time-constants';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { SortOption } from '@/features/job/job-postings-box';

const { JOB_POSTING } = QUERY_KEY;
const { AN_HOUR } = STALE_TIME;

type Props = {
  userMetaData: UserMetaDataType;
  userId: string;
  sortOption: SortOption;
  page: number;
  limit: number;
};

export const useJobPostingQuery = ({ userMetaData, userId, sortOption = 'latest', page = 1, limit }: Props) => {
  return useQuery({
    queryKey: [JOB_POSTING, userId, sortOption, page, JSON.stringify(userMetaData)],
    queryFn: () => getJobByUserMetaData(userMetaData, sortOption, page, limit),
    staleTime: AN_HOUR,
  });
};
