'use server';

import { AUTH_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;

/**
 * 현재 로그인된 사용자의 메타 데이터 정보를 가져옵니다.
 * @returns {Promise<UserMetaDataType | null>}
 */
export const getUserMetaData = async (): Promise<UserMetaDataType | null> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error(AUTH_REQUIRED);
  }

  const userId = session.user.id;

  const userData = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userData) return null;

  return userData.userMetaData as UserMetaDataType;
};
