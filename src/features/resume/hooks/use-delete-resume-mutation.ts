import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Resume } from '@prisma/client';
import { deleteResume } from '@/features/resume/api/client-services';

export const useDeleteResumeMutation = (queryKey: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resumeId: number) => deleteResume(resumeId),
    onMutate: async (resumeId) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });
      const previousResume = queryClient.getQueryData([queryKey]) as Resume[] | undefined;
      queryClient.setQueryData([queryKey], (old: Resume[]) => old.filter((resume) => resume.id !== resumeId));

      return { previousResume };
    },

    onError: (err, resumeId, context) => {
      if (context) {
        queryClient.setQueryData([queryKey], context.previousResume);
      }
    },
    onSettled: (data, error, resumeId) => queryClient.invalidateQueries({ queryKey: [queryKey, resumeId] }),
  });
};
