import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CharacterState = {
  characterId: number | null;
  setCharacterId: (id: number) => void;
};

const initialState: CharacterState = {
  characterId: null,
  setCharacterId: () => {},
};

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set) => ({
      characterId: initialState.characterId,
      setCharacterId: (id) => set({ characterId: id }),
    }),
    {
      name: 'character-store',
    }
  )
);
