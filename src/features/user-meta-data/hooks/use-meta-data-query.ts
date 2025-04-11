import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUserMetaData } from '@/features/user-meta-data/api/client-services';
import type { User } from '@prisma/client';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import { STALE_TIME } from '@/constants/time-constants';
import { QUERY_KEY } from '@/constants/query-key';
const { META_DATA } = QUERY_KEY;

type Props = {
  userId: User['id'];
};
const { A_DAY } = STALE_TIME;
export const UseMetaDataQuery = ({ userId }: Props): UseQueryResult<UserMetaDataType> => {
  return useQuery({
    queryKey: [META_DATA, userId],
    queryFn: () => getUserMetaData(userId),
    enabled: !!userId,
    staleTime: A_DAY,
  });
};
