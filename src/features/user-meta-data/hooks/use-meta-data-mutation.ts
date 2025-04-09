import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserMetaData } from '../api/client-services';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import type { User } from '@/types/user';
import { QUERY_KEY } from '@/constants/query-key';
const { META_DATA } = QUERY_KEY;
const useMetaDataMutation = (userId: User['id']) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [META_DATA, userId],
    mutationFn: async (values: UserMetaDataType) => postUserMetaData(userId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [META_DATA, userId],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export default useMetaDataMutation;
