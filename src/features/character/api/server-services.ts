'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { AUTH_MESSAGE } from '@/constants/message-constants';
import type { CharacterType } from '@/types/DTO/character-dto';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;

/**
 * 현재 로그인된 사용자의 캐릭터와 그에 해당하는 캐릭터 히스토리를 가져옵니다.
 * @returns {Promise<Character | null>}
 */
export const getCharacterByUserId = async (): Promise<CharacterType | null> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error(AUTH_REQUIRED);
  }

  const userId = session.user.id;

  const character = await prisma.character.findFirst({
    where: { userId },
  });

  if (!character) {
    return null;
  }

  return character;
};
