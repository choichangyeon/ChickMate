'use server';

import { AUTH_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import type { User } from '@/types/user';
import { User as UserType } from '@prisma/client';
type MetaData = UserType['userMetaData'];
const {
  ERROR: { EXPIRED_TOKEN },
} = AUTH_MESSAGE;
/**
 * user의 meta data를 불러오는 함수
 * @param userId - 현재 로그인 중인 user의 Id
 * @returns user의 meta data
 */
export const getUserMetaData = async (userId: User['id']): Promise<MetaData> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      throw {
        message: EXPIRED_TOKEN,
        code: 401,
      }; // middleware에서 user가 없을 시, 즉 session이 만료됐다면 sign-in 페이지로 이동시키기 때문에 이걸 탈 일이 없긴 함

    return user.userMetaData;
  } catch (error) {
    throw error;
  }
};
