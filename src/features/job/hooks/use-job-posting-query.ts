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
};

export const useJobPostingQuery = ({ userMetaData, userId, sortOption }: Props) => {
  return useQuery({
    queryKey: [JOB_POSTING, userId, sortOption],
    queryFn: () => getJobByUserMetaData(userMetaData, sortOption),
    staleTime: AN_HOUR,
  });
};
