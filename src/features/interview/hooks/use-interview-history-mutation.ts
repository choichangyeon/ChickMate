import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { patchInterviewHistoryStatus } from '@/features/interview/api/client-services';

const { HISTORY } = QUERY_KEY;

export const usePatchInterviewHistoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ interviewId, status }: { interviewId: number; status: number }) =>
      patchInterviewHistoryStatus({ interviewId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HISTORY] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
