import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchInterviewHistoryStatus } from '@/features/interview/api/client-services';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import { QUERY_KEY } from '@/constants/query-key';

const { HISTORY } = QUERY_KEY;

type Props = {
  interviewId: InterviewHistoryType['id'];
  status: InterviewHistoryType['status'];
};

export const usePatchInterviewHistoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ interviewId, status }: Props) => patchInterviewHistoryStatus({ interviewId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HISTORY] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
