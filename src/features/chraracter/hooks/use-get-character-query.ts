import { useQuery } from '@tanstack/react-query';
import { getCharacterByUserId } from '../api/client-services';
import { CHARACTER_QUERY_KEY } from '@/constants/query-key';

const { CHARACTER } = CHARACTER_QUERY_KEY;

export const useGetCharacterQuery = () => {
  return useQuery({
    queryKey: [CHARACTER],
    queryFn: getCharacterByUserId,
  });
};
