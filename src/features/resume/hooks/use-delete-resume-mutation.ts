import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Resume } from '@prisma/client';
import { deleteResume } from '@/features/resume/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';
import { TABS } from '@/constants/my-page-constants';
import { getMyPagePath } from '@/features/my-page/utils/get-my-page-path';

const { MY_PAGE } = PATH;
const { RESUMES, TABS_COUNT } = QUERY_KEY;
const { RESUME } = TABS;

export const useDeleteResumeMutation = (queryKey: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (resumeId: number) => deleteResume(resumeId),
    onMutate: async (resumeId) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });
      const previousResume = queryClient.getQueryData([queryKey]) as Resume[];

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
        queryClient.invalidateQueries({ queryKey: [TABS_COUNT] });
        router.replace(getMyPagePath(RESUME));
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
};
