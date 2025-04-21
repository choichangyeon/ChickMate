import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBookmarkWithJobPostingId } from '@/features/job/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';

const { BOOKMARK } = QUERY_KEY;

type Props = {
  jobPostingId: number;
  userId?: string;
};

export const useBookmarkMutation = ({ jobPostingId, userId }: Props) => {
  const queryClient = useQueryClient();
  return useMutation({
    // TODO: JobPosting과 BookMark queryKey 재설정 필요 - 불필요한 cache context가 너무 많이 생김
    mutationKey: [BOOKMARK, jobPostingId],
    mutationFn: async (isBookmarked: boolean) => {
      return await postBookmarkWithJobPostingId({ jobPostingId, isBookmarked });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BOOKMARK, jobPostingId],
      });

      if (userId) {
        queryClient.invalidateQueries({ queryKey: [BOOKMARK, userId] });
      }
    },
    onError: (error) => {
      throw error;
    },
  });
};
