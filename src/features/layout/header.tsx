import HeaderCharacter from '@/features/character/header-character';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import Typography from '@/components/ui/typography';
import { getTitleFromPath } from './utils/getTitleFromPath';

export const Header = async () => {
  const session = await getServerSession(authOptions);

  const title = getTitleFromPath();

  return (
    <header className='flex items-center justify-between bg-white py-4 border-b border-cool-gray-500'>
      <Typography size='xl' weight='bold'>
        {title}
      </Typography>
      <HeaderCharacter session={session} />
    </header>
  );
};
