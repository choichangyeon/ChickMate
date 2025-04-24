import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { deleteInterviewHistory } from '@/features/interview/api/client-services';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import { Notify } from 'notiflix';
import { NOTIFLIX_WARNING_INTERVIEW_IN_PROGRESS } from '@/constants/notiflix-constants';

const { IN_PROGRESS } = QUERY_KEY;
const {
  ERROR: { DELETE_ERROR },
  SUCCESS: { DELETE_SUCCESS },
} = NOTIFLIX_WARNING_INTERVIEW_IN_PROGRESS;

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
      Notify.success(DELETE_SUCCESS);
    },
    onError: (error) => {
      Notify.failure(DELETE_ERROR);
      throw error;
    },
  });
};
