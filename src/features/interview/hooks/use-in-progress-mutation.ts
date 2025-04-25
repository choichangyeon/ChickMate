import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { deleteInterviewHistory, postInterview } from '@/features/interview/api/client-services';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import type { ResumeType } from '@/types/DTO/resume-dto';
import { Notify } from 'notiflix';
import { NOTIFLIX_WARNING_INTERVIEW_IN_PROGRESS } from '@/constants/notiflix-constants';

type DeleteProps = {
  interviewId: InterviewHistoryType['id'];
  status: InterviewHistoryType['status'];
  options: string;
};

export const useInProgressDeleteMutation = () => {
  return useMutation({
    mutationFn: ({ interviewId, options, status }: DeleteProps) =>
      deleteInterviewHistory({ interviewId, options, status }),
  });
};
