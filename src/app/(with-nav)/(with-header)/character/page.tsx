'use client';

import { usePostExperienceMutation } from '@/hooks/mutations/use-post-experience-mutation';
import { useCharacterStore } from '@/store/use-character-store';

const CharacterPage = () => {
  const characterId = useCharacterStore((state) => state.characterId);

  const { mutate: updateExp } = usePostExperienceMutation();

  const handleExperienceUp = () => {
    if (characterId === null) return; 
    updateExp({ characterId, amount: 10 });
  };

  return (
    <div className='flex flex-col'>
      <button className='rounded-md border border-cyan-900 text-red-400' onClick={handleExperienceUp}>
        캐릭터 경험치
      </button>
    </div>
  );
};

export default CharacterPage;
