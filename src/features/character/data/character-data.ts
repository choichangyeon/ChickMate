import { Character } from '@prisma/client';

export const defaultCharacter: Character = {
  id: 0,
  userId: 'guest',
  type: 'poly',
  level: 6,
  experience: 10000000000,
  createdAt: new Date(),
};
