'use server';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import { AUTH_MESSAGE } from '@/constants/message-constants';
import { Character, CharacterHistory } from '@prisma/client';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;

/**
 * 현재 로그인된 사용자의 캐릭터와 그에 해당하는 캐릭터 히스토리를 가져옵니다.
 * @returns {Promise<Character | (Character & { characterHistories: CharacterHistory[] }) | null>}
 */
export const getCharacterByUserId = async (): Promise<
  Character | (Character & { characterHistories: CharacterHistory[] }) | null
> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error(AUTH_REQUIRED);
  }

  const userId = session.user.id;

  const character = await prisma.character.findFirst({
    where: { userId },
    include: {
      characterHistories: true, // characterHistories를 포함시킴
    },
  });

  if (!character) {
    return null; // 캐릭터가 없을 경우 null 반환
  }

  return character; // 캐릭터와 그에 해당하는 히스토리를 반환
};
