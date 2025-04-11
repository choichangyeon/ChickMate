import HeaderCharacter from '@/features/character/header-character';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className='flex justify-around bg-white pl-20'>
      <span>헤더입니다.</span>
      <HeaderCharacter session={session} />
    </header>
  );
};
