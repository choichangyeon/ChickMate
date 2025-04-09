import { User } from '@/types/user';
import HeaderCharacter from '../chraracter/header-character';

export const Header = async ({ user }: { user: User }) => {
  return (
    <header className='flex justify-around bg-white pl-20'>
      <span>헤더입니다.</span>
      <HeaderCharacter user={user} />
    </header>
  );
};
