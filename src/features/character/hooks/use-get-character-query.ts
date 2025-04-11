import { useQuery } from '@tanstack/react-query';
import { getCharacterByUserId } from '@/features/character/api/client-services';
import { QUERY_KEY } from '@/constants/query-key';

const { CHARACTER } = QUERY_KEY;
const RETRY_OPTION = {
  RETRY_CHARACTER: 0,
};

const { RETRY_CHARACTER } = RETRY_OPTION;

export const useGetCharacterQuery = () => {
  return useQuery({
    queryKey: [CHARACTER],
    queryFn: getCharacterByUserId,
    retry: RETRY_CHARACTER,
  });
};
