import { Nav } from '@/features/layout/nav';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import React from 'react';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getServerSession(authOptions);

  return (
    <>
      <Nav user={user} />
      <main className='flex-1 bg-green-200'>{children}</main>
    </>
  );
};

export default MainLayout;
