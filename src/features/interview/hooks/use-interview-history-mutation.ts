import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { patchInterviewHistoryStatus } from '@/features/interview/api/client-services';

export const usePatchInterviewHistoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interviewId: number) => patchInterviewHistoryStatus(interviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.HISTORY] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
