import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Resume } from '@prisma/client';
import { deleteResume } from '@/features/resume/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';

const { MY_PAGE } = PATH;
const { RESUMES } = QUERY_KEY;

export const useDeleteResumeMutation = (queryKey: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (resumeId: number) => deleteResume(resumeId),
    onMutate: async (resumeId) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });
      const previousResume = queryClient.getQueryData([queryKey]) as Resume[] | undefined;
      queryClient.setQueryData([queryKey], (old: Resume[]) => old.filter((resume) => resume.id !== resumeId));

      return { previousResume };
    },

    onError: (error, resumeId, context) => {
      if (context) {
        queryClient.setQueryData([queryKey], context.previousResume);
      }
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      if (queryKey === RESUMES) {
        router.replace(MY_PAGE);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
};
