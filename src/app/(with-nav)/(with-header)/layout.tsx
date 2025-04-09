import { Header } from '@/features/layout/header';
import { User } from '@/types/user';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';

const HeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
};

export default HeaderLayout;
