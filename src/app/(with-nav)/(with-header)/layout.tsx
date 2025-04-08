import { Header } from '@/features/layout/header';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';

const HeaderLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
};

export default HeaderLayout;
