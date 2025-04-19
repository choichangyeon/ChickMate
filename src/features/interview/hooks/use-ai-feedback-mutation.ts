import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { postAIInterviewFeedback } from '@/features/interview/api/client-services';

export const usePostAIFeedbackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interviewId: number) => postAIInterviewFeedback({ interviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.HISTORY] });
    },
  });
};
