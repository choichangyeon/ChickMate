import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { deleteInterviewHistory } from '@/features/interview/api/client-services';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';

const { IN_PROGRESS } = QUERY_KEY;

type Props = {
  interviewId: InterviewHistoryType['id'];
  status: InterviewHistoryType['status'];
  options: string;
};

export const useInProgressDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ interviewId, options, status }: Props) => deleteInterviewHistory({ interviewId, options, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [IN_PROGRESS] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
