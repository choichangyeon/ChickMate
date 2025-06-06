import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserMetaData } from '@/features/user-meta-data/api/client-services';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import type { UserType } from '@/types/DTO/user-dto';
import { QUERY_KEY } from '@/constants/query-key';
const { META_DATA } = QUERY_KEY;

const useMetaDataMutation = (userId: UserType['id']) => {
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
