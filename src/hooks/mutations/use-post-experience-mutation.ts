import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const { PATCH } = API_METHOD;
const { JSON_HEADER } = API_HEADER;
const { EXPERIENCE } = ROUTE_HANDLER_PATH.CHARACTER;

export const usePostExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ characterId, amount }: { characterId: number; amount: number }) => {
      const res = await fetchWithSentry(EXPERIENCE, {
        method: PATCH,
        headers: JSON_HEADER,
        body: JSON.stringify({ characterId, amount }),
      });

      if (!res.ok) {
        throw new Error('경험치 업데이트 실패');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['character'] });
    },
  });
};
