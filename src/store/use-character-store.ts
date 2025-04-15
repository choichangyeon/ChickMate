import { create } from 'zustand';

type CharacterState = {
  characterId: number | null;
  setCharacterId: (id: number) => void;
};

const initialState: CharacterState = {
  characterId: null,
  setCharacterId: () => {},
};

export const useCharacterStore = create<CharacterState>()((set) => ({
  characterId: initialState.characterId,
  setCharacterId: (id) => set({ characterId: id }),
}));
