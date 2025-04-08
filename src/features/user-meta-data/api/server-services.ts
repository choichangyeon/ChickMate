'use server';

import { prisma } from '@/lib/prisma';
import type { User } from '@/types/user';
import { User as UserType } from '@prisma/client';
type MetaData = UserType['userMetaData'];

/**
 * user의 meta data를 불러오는 함수
 * @param userId - 현재 로그인 중인 user의 Id
 * @returns user의 meta data
 */
export const getUserMetaData = async (userId: User['id']): Promise<MetaData> => {
  try {
    const { userMetaData } = await prisma.user.findUnique({
      where: { id: userId },
    });
    return userMetaData;
  } catch (error) {
    throw error; //@TODO: error statusCode가 정의가 안 되는데.. 이거 serverActionWithSentry에서 어떻게 잡죠..?
  }
};
