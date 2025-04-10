'use client';

import { useGetCharacterQuery } from './hooks/use-get-character-query';
import { User } from '@/types/user';
import Image from 'next/image';
import { getLevelAndPercentage } from './utils/get-level-and-percent';

type Props = {
  user?: User;
};

const HeaderCharacter = ({ user }: Props) => {
  const { data, isPending, isError, refetch } = useGetCharacterQuery();

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

  const { level, percent } = getLevelAndPercentage(data.experience);

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
