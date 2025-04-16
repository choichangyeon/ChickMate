import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBookmarkWithJobPostingId } from '@/features/job/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';

const { BOOKMARK } = QUERY_KEY;

type Props = {
  jobPostingId: number;
};

export const useBookmarkMutation = ({ jobPostingId }: Props) => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationKey: [BOOKMARK, jobPostingId],
    mutationFn: async (isBookmarked: boolean) => {
      return await postBookmarkWithJobPostingId({ jobPostingId, isBookmarked });
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [BOOKMARK, jobPostingId],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
