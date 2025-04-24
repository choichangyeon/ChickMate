import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBookmarkWithJobPostingId } from '@/features/job/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';
import type { JobPostingType } from '@/types/DTO/job-posting-dto';

const { JOB_POSTING, TABS_COUNT, BOOKMARK } = QUERY_KEY;

type Props = {
  jobPostingId: number;
  userId: string;
};

export const useBookmarkMutation = ({ jobPostingId, userId }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [JOB_POSTING, userId],

    mutationFn: async (isBookmarked: boolean) => {
      return await postBookmarkWithJobPostingId({ jobPostingId, isBookmarked });
    },

    onMutate: async (isBookmarked) => {
      await queryClient.cancelQueries({ queryKey: [JOB_POSTING, userId] });
      const previousJobPostings = queryClient.getQueryData([JOB_POSTING, userId]) as JobPostingType[] | undefined;

      queryClient.setQueryData([JOB_POSTING, userId], (old: JobPostingType[] = []) => {
        return old.map((job) => {
          if (job.id === jobPostingId) {
            return { ...job, isBookmarked: !isBookmarked };
          }
          return job;
        });
      });

      return { previousJobPostings };
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: [JOB_POSTING, userId] });
        queryClient.invalidateQueries({ queryKey: [BOOKMARK, userId] });
        queryClient.invalidateQueries({ queryKey: [TABS_COUNT] });
      }
    },
    onError: (error, isBookmarked, context) => {
      if (context?.previousJobPostings) {
        queryClient.setQueryData([JOB_POSTING, userId], context.previousJobPostings);
      }
      throw error;
    },
  });
};
