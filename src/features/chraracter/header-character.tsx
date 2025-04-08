'use client';

import React, { useEffect } from 'react';
import { useGetCharacterQuery } from './hooks/use-get-character-query';
import { User } from '@/types/user';
import Image from 'next/image';
import { useCharacterStore } from '@/store/use-character-store';
import { getLevelAndPercentage } from './utils/get-level-and-percent';

type Props = {
  user?: User;
};

const HeaderCharacter = ({ user }: Props) => {
  const { data, isPending, isError } = useGetCharacterQuery();

  // 캐릭터 id zustand로 관리
  const setCharacterId = useCharacterStore((state) => state.setCharacterId);

  if (!data) return null;

  useEffect(() => {
    if (data.id) {
      setCharacterId(data.id);
    }
  }, [data, setCharacterId]);

  if (isPending) {
    return null;
  }
  if (isError) {
    return null;
  }

  const { level, percent } = getLevelAndPercentage(data.experience);

  return (
    <div className='flex gap-2'>
      <div className='flex'>
        <div>
          <div>
            <span>LV{level}</span>
            <span>{user.name}님</span>
          </div>
          <div>{percent}%</div>
        </div>
        <div>
          <Image src={`/assets/character/header/level${level}.jpeg`} width={70} height={70} alt='character-img' />
        </div>
      </div>
    </div>
  );
};

export default HeaderCharacter;
