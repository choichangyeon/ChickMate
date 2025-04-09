import { User } from '@/types/user';
import HeaderCharacter from '../chraracter/header-character';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { CHARACTER_QUERY_KEY } from '@/constants/query-key';
import { getCharacterByUserId } from '../chraracter/api/server-services';
import { serverActionWithSentry } from '@/utils/server-action-with-sentry';

const { CHARACTER } = CHARACTER_QUERY_KEY;

export const Header = async ({ user }: { user: User }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [CHARACTER],
    queryFn: () => serverActionWithSentry(getCharacterByUserId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className='flex justify-around bg-white pl-20'>
        <span>헤더입니다.</span>
        <HeaderCharacter user={user} />
      </header>
    </HydrationBoundary>
  );
};
