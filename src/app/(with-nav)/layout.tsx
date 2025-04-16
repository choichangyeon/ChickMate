import { getServerSession } from 'next-auth';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { getCharacterByUserId } from '@/features/character/api/server-services';
import { Nav } from '@/features/layout/nav';
import { authOptions } from '@/utils/auth-option';
import { serverActionWithSentry } from '@/utils/server-action-with-sentry';
import { getUserMetaData } from '@/features/user-meta-data/api/server-services';

const { CHARACTER, META_DATA } = QUERY_KEY;

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [CHARACTER],
      queryFn: () => serverActionWithSentry(getCharacterByUserId),
    }),
    queryClient.prefetchQuery({
      queryKey: [META_DATA, session?.user.id],
      queryFn: () => serverActionWithSentry(getUserMetaData),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Nav session={session} />
      <div className='max-h-[100dvh] flex-1 overflow-scroll scrollbar-hide'>{children}</div>
    </HydrationBoundary>
  );
};

export default MainLayout;
