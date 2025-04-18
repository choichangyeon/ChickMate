import { Character } from '@prisma/client';

export const defaultCharacter: Character = {
  id: 0,
  userId: 'guest',
  type: 'clay',
  level: 4,
  experience: 0,
  createdAt: new Date(),
};
