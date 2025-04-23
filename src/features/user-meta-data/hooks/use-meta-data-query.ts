import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUserMetaData } from '@/features/user-meta-data/api/client-services';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import type { UserType } from '@/types/DTO/user-dto';
import { STALE_TIME } from '@/constants/time-constants';
import { QUERY_KEY } from '@/constants/query-key';

const { META_DATA } = QUERY_KEY;

type Props = {
  userId: UserType['id'];
};
const { A_DAY } = STALE_TIME;
export const useMetaDataQuery = ({ userId }: Props) => {
  return useQuery({
    queryKey: [META_DATA, userId],
    queryFn: () => getUserMetaData(userId),
    enabled: !!userId,
    staleTime: A_DAY,
  });
};
