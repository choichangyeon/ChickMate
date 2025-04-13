import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { postUserMetaData } from '@/features/user-meta-data/api/client-services';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import type { User } from '@/types/user';
import { QUERY_KEY } from '@/constants/query-key';
const { META_DATA } = QUERY_KEY;

// UseMutationResult<TData,TError,TVariables>
// TData : mutationFn의 반환값
// TError : 에러 타입
// TVariables : mutationFn의 인자

const useMetaDataMutation = (userId: User['id']): UseMutationResult<void, unknown, UserMetaDataType> => {
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
