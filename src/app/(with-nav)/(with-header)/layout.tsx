import { Header } from '@/features/layout/header';

const HeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='mx-auto h-full min-h-screen max-w-max px-12 pb-8 pt-28 mobile:px-6'>{children}</main>
    </>
  );
};

export default HeaderLayout;
