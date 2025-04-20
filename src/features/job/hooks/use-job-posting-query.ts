import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getJobByUserMetaData } from '@/features/job/api/client-services';
import { STALE_TIME } from '@/constants/time-constants';
import { UserMetaDataType } from '@/types/user-meta-data-type';

const { JOB_POSTING } = QUERY_KEY;
const { AN_HOUR } = STALE_TIME;

type Props = {
  userMetaData: UserMetaDataType;
  userId: string;
};

export const useJobPostingQuery = ({ userMetaData, userId }: Props) => {
  return useQuery({
    // TODO: JobPosting과 BookMark queryKey 재설정 필요 - 불필요한 cache context가 너무 많이 생김
    queryKey: [JOB_POSTING, userId],
    queryFn: () => getJobByUserMetaData(userMetaData),
    staleTime: AN_HOUR,
  });
};
