import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSample } from '../api/client-services';
import { QUERY_KEY } from '@/constants/query-key';

export const usePostSampleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => postSample(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queryKey'] });
    },
  });
};
