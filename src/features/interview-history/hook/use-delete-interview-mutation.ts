import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { InterviewHistory } from '@prisma/client';
import { deleteInterview } from '@/features/interview-history/api/client-services';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';

const { HISTORY } = QUERY_KEY;
const { MY_PAGE } = PATH;

export const useDeleteInterviewMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (interviewId: number) => deleteInterview(interviewId),

    onMutate: async (interviewId) => {
      await queryClient.cancelQueries({ queryKey: [HISTORY] });

      const previousInterviewList = queryClient.getQueryData([HISTORY]) as InterviewHistory[] | undefined;

      queryClient.setQueryData([HISTORY], (old: InterviewHistory[] = []) =>
        old.filter((interview) => interview.id !== interviewId)
      );

      return { previousInterviewList };
    },

    onError: (err, interviewId, context) => {
      if (context?.previousInterviewList) {
        queryClient.setQueryData([HISTORY], context.previousInterviewList);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [HISTORY] });
      router.push(MY_PAGE);
    },
  });
};
