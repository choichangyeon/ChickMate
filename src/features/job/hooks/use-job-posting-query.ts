import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getJobByUserMetaData } from '@/features/job/api/client-services';
import { STALE_TIME } from '@/constants/time-constants';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { getUserMetaData } from '@/features/user-meta-data/api/client-services';

const { JOB_POSTING } = QUERY_KEY;
const { AN_HOUR } = STALE_TIME;

type Props = {
  userId: string;
};

export const useJobPostingQuery = ({ userId }: Props) => {
  return useQuery({
    queryKey: [JOB_POSTING],
    queryFn: async () => {
      const userMetaData: UserMetaDataType = await getUserMetaData(userId);
      return getJobByUserMetaData(userMetaData);
    },
    staleTime: AN_HOUR,
    enabled: !!userId,
  });
};
