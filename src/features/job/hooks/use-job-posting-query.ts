import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getJobByUserMetaData } from '@/features/job/api/client-services';
import { STALE_TIME } from '@/constants/time-constants';
import { UserMetaDataType } from '@/types/user-meta-data-type';

const { JOB_POSTING } = QUERY_KEY;
const { AN_HOUR } = STALE_TIME;

type Props = {
  userMetaData?: UserMetaDataType;
};

export const useJobPostingQuery = ({ userMetaData }: Props) => {
  return useQuery({
    queryKey: [JOB_POSTING],
    queryFn: async () => getJobByUserMetaData(userMetaData!),
    staleTime: AN_HOUR,
    enabled: !!userMetaData,
  });
};
