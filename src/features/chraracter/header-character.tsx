'use client';

import { User } from '@/types/user';
import Image from 'next/image';
import { getLevelAndPercentage } from './utils/get-level-and-percent';
import { useGetCharacterQuery } from '@/features/chraracter/hooks/use-get-character-query';
import { useCharacterStoreSync } from '@/features/chraracter/hooks/use-character-store-sync';

type Props = {
  user?: User;
};

const HeaderCharacter = ({ user }: Props) => {
  const { data: characterData, isPending, isError, refetch } = useGetCharacterQuery();

  useCharacterStoreSync(characterData);

  if (isPending) {
    return null;
  }
  if (isError) {
    return null;
  }

  // 테스트용 reset
  const handleResetExperience = async () => {
    await fetch('/api/character/reset', {
      method: 'PATCH',
    });
    await refetch();
  };

  const { level, percent } = getLevelAndPercentage(characterData.experience);

  return (
    <div className='flex gap-2'>
      <div className='flex'>
        <div>
          <div>
            <span>LV{level}</span>
            {user && <span>{user.name}님</span>}
          </div>
          <div>{percent}%</div>
          <button onClick={handleResetExperience} className='mt-2 rounded bg-red-500 px-2 py-1 text-white'>
            경험치 초기화
          </button>
        </div>
        <div>
          <Image src={`/assets/character/header/level${level}.jpeg`} width={70} height={70} alt='character-img' />
        </div>
      </div>
    </div>
  );
};

export default HeaderCharacter;
