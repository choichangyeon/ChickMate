import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { Resume } from '@prisma/client';
import { deleteResume } from '@/features/resume/api/client-services';

export const useDeleteResumeMutation = () => {
  const { RESUME_DRAFT } = QUERY_KEY;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resumeId: number) => deleteResume(resumeId),
    onMutate: async (resumeId) => {
      await queryClient.cancelQueries({ queryKey: [RESUME_DRAFT] });
      const previousResume = queryClient.getQueryData([RESUME_DRAFT]) as Resume[] | undefined;
      queryClient.setQueryData([RESUME_DRAFT], (old: Resume[]) => old.filter((resume) => resume.id !== resumeId));

      return { previousResume };
    },

    onError: (err, resumeId, context) => {
      if (context) {
        queryClient.setQueryData([RESUME_DRAFT], context.previousResume);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [RESUME_DRAFT] }),
  });
};
