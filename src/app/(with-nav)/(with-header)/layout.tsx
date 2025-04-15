import { Header } from '@/features/layout/header';

const HeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='mx-auto max-w-[1440px]'>{children}</main>
    </>
  );
};

export default HeaderLayout;
