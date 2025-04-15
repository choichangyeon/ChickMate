import { Character } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCharacterHistories } from '@/features/character/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';

type Props = Character['id'];

const ITEMS_PER_PAGE = 5;
const { CHARACTER_HISTORIES } = QUERY_KEY;

export const useCharacterHistoryInfiniteQuery = (id: Props) => {
  return useInfiniteQuery({
    queryKey: [CHARACTER_HISTORIES, id],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getCharacterHistories({
        characterId: id,
        pageParam,
        limit: ITEMS_PER_PAGE,
      });
      return data;
    },

    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });
};
