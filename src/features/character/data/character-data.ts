import type { CharacterType } from '@/types/DTO/character-dto';

export const defaultCharacter: CharacterType = {
  id: 0,
  userId: 'guest',
  type: 'clay',
  level: 4,
  experience: 0,
  createdAt: new Date(),
};
