import { Header } from '@/features/layout/header';

const HeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='max-w-screen-desktop mx-auto px-12 pb-8 pt-28'>{children}</main>
    </>
  );
};

export default HeaderLayout;
