'use client';

import Image from 'next/image';
import { useGetCharacterQuery } from './hooks/use-get-character-query';
import { useCharacterStore } from '@/store/use-character-store';
import { useEffect } from 'react';
import { getLevelAndPercentage } from './utils/get-level-and-percent';

const MainCharacter = () => {
  const { data, isPending, isError } = useGetCharacterQuery();

  const setCharacterId = useCharacterStore((state) => state.setCharacterId);

  useEffect(() => {
    if (data) {
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
    <div className='flex flex-col rounded-lg border p-7'>
      <div className='flex items-center gap-3 text-black/50'>
        <span className='text-2xl font-extrabold'>EXP</span>
        <div className='flex w-full justify-around'>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-[6px] w-5 rounded-sm ${i < Math.floor(percent / 10) ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <Image src={`/assets/character/card/level${level}.png`} width={344} height={344} alt='character-img' />
      <div className='flex gap-6'>
        <span className='text-[40px] font-extrabold text-red-500'>LV : {level}</span>
        <div className='flex items-center justify-center rounded-3xl border border-black px-9 py-3'>
          <span className='text-xl'>똑똑한 병아리</span>
        </div>
      </div>
    </div>
  );
};

export default MainCharacter;
