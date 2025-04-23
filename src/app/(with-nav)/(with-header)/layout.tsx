import { Header } from '@/features/layout/header';

const HeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='mx-auto h-full max-w-screen-desktop px-12 pb-8 pt-28'>{children}</main>
    </>
  );
};

export default HeaderLayout;
