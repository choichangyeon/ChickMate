import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteInterview } from '@/features/interview-history/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';

const { HISTORY } = QUERY_KEY;

export const useDeleteInterviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (interviewId: number) => deleteInterview(interviewId),
    onMutate: async (interviewId) => {
      await queryClient.cancelQueries({ queryKey: [HISTORY] });
      const previousInterviewList = queryClient.getQueryData([HISTORY]) as InterviewHistoryType[] | undefined;
      queryClient.setQueryData([HISTORY], (old: InterviewHistoryType[] = []) =>
        old.filter((interview) => interview.id !== interviewId)
      );
      return { previousInterviewList };
    },
    onError: (err, interviewId, context) => {
      if (context?.previousInterviewList) {
        queryClient.setQueryData([HISTORY], context.previousInterviewList);
      }
      throw err;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [HISTORY],
      });
    },
  });
};
