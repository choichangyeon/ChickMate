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
