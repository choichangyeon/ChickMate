import { useEffect } from 'react';
import { useCharacterStore } from '@/store/use-character-store';
import { Character } from '@prisma/client';

type Props = Character | undefined;

export const useCharacterStoreSync = (characterData: Props) => {
  const setCharacterId = useCharacterStore((state) => state.setCharacterId);

  useEffect(() => {
    if (characterData) {
      setCharacterId(characterData.id);
    }
  }, [characterData, setCharacterId]);
};
