import { TABS } from '@/constants/my-page-constants';
import { QUERY_KEY } from '@/constants/query-key';
import { getMyPagePath } from '@/features/my-page/utils/get-my-page-path';
import { deleteResume } from '@/features/resume/api/client-services';
import type { UserType } from '@/types/DTO/user-dto';
import { Resume } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const { RESUMES, TABS_COUNT, HISTORY } = QUERY_KEY;
const { RESUME } = TABS;

export const useDeleteResumeMutation = (queryKey: string, userId?: UserType['id']) => {
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
        if (userId) queryClient.invalidateQueries({ queryKey: [HISTORY, userId] });
        queryClient.invalidateQueries({ queryKey: [TABS_COUNT] });
        router.replace(getMyPagePath(RESUME));
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });
};
