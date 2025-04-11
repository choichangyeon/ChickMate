import { Character } from '@prisma/client';

export const defaultCharacter: Character = {
  id: 0,
  userId: 'guest',
  type: 'yellow',
  level: 4,
  experience: 10000000000,
  createdAt: new Date(),
};
