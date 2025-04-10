import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { Resume } from '@prisma/client';
import { deleteResume } from '@/features/resume/api/client-services';

export const useDeleteResumeMutation = () => {
  const { RESUME } = QUERY_KEY;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resumeId: number) => deleteResume(resumeId),
    onMutate: async (resumeId) => {
      await queryClient.cancelQueries({ queryKey: [RESUME] });
      const previousResume = queryClient.getQueryData([RESUME]) as Resume[] | undefined;
      queryClient.setQueryData([RESUME], (old: Resume[]) => old.filter((resume) => resume.id !== resumeId));

      return { previousResume };
    },

    onError: (err, resumeId, context) => {
      if (context) {
        queryClient.setQueryData([RESUME], context.previousResume);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [RESUME] }),
  });
};
