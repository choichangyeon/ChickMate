import { Header } from '@/features/layout/header';

const HeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderLayout;
