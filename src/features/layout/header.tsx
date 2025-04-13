import HeaderCharacter from '@/features/character/header-character';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { HeaderTitle } from './header-title';

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className='flex items-center justify-between border-b border-cool-gray-500 bg-white py-4'>
      <HeaderTitle />
      <HeaderCharacter session={session} />
    </header>
  );
};
