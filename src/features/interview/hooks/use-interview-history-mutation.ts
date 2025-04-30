import { useMutation } from '@tanstack/react-query';
import { patchInterviewHistoryStatus } from '@/features/interview/api/client-services';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';

type Props = {
  interviewId: InterviewHistoryType['id'];
  status: InterviewHistoryType['status'];
};

export const usePatchInterviewHistoryMutation = () => {
  return useMutation({
    mutationFn: ({ interviewId, status }: Props) => patchInterviewHistoryStatus({ interviewId, status }),
  });
};
