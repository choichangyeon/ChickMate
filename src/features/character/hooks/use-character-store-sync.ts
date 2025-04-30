import { useEffect } from 'react';
import { useCharacterStore } from '@/store/use-character-store';
import type { CharacterType } from '@/types/DTO/character-dto';

type Props = CharacterType | undefined;

export const useCharacterStoreSync = (characterData: Props) => {
  const setCharacterId = useCharacterStore((state) => state.setCharacterId);

  useEffect(() => {
    if (characterData) {
      setCharacterId(characterData.id);
    }
  }, [characterData, setCharacterId]);
};
