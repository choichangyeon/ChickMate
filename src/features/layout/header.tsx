import HeaderCharacter from '@/features/character/header-character';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { HeaderTitle } from './header-title';
import BackButton from './back-button';

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className='fixed z-modal flex h-20 w-[calc(100vw-52px)] items-center justify-between border-b border-cool-gray-500 bg-white py-4 mobile:w-full mobile:px-3'>
      <div className='mobile:flex mobile:gap-2'>
        <BackButton />
        <HeaderTitle />
      </div>
      <HeaderCharacter session={session} />
    </header>
  );
};
