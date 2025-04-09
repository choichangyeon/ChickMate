import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteResume } from '../api/client-services';
import { QUERY_KEY } from '@/constants/query-key';

export const useDeleteResumeMutation = () => {
  const { RESUME } = QUERY_KEY;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resumeId: number) => deleteResume(resumeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESUME] });
    },
  });
};
