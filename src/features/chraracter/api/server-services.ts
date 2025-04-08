'use server';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import { AUTH_MESSAGE } from '@/constants/message-constants';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;

export const getCharacterByUserId = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error(AUTH_REQUIRED);
  }

  const userId = session.user.id;

  const character = await prisma.character.findFirst({
    where: { userId },
  });

  return character;
};
