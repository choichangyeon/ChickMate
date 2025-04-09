import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { postBookmarkWithJobPostingId } from '../api/client-services';
import { JOB_QUERY_KEY } from '@/constants/query-key';

const { BOOKMARK } = JOB_QUERY_KEY;

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
