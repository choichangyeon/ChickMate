'use client';

import { CHARACTER_HISTORY_KEY } from '@/constants/character-constants';
import { useExperienceUp } from '@/features/character/hooks/use-experience-up';

const { GENERAL_HISTORY } = CHARACTER_HISTORY_KEY;

const CharacterPage = () => {
  const { handleExperienceUp } = useExperienceUp();

  return (
    <div className='flex flex-col'>
      <button
        className='rounded-md border border-cyan-900 text-red-400'
        onClick={() => handleExperienceUp(GENERAL_HISTORY)}
      >
        캐릭터 경험치
      </button>
    </div>
  );
};

export default CharacterPage;
