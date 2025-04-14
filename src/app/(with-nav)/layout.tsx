import { QUERY_KEY } from '@/constants/query-key';
import { getCharacterByUserId } from '@/features/character/api/server-services';
import { Nav } from '@/features/layout/nav';
import { User } from '@/types/user';
import { authOptions } from '@/utils/auth-option';
import { serverActionWithSentry } from '@/utils/server-action-with-sentry';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import React from 'react';

const { CHARACTER } = QUERY_KEY;

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [CHARACTER],
    queryFn: () => serverActionWithSentry(getCharacterByUserId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Nav user={user} />
      <main className='max-h-[100dvh] flex-1 overflow-scroll'>{children}</main>
    </HydrationBoundary>
  );
};

export default MainLayout;
