'use server';

import { prisma } from '@/lib/prisma';
import type { User } from '@/types/user';

export const getUserMetaData = async (userId: User['id']) => {
  try {
    const { userMetaData } = await prisma.user.findUnique({
      where: { id: userId },
    });
    return userMetaData;
  } catch (error) {
    console.error(error);
  }
};
