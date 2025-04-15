'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { prisma } from '@/lib/prisma';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';

/**
 * 자소서 불러오기 요청
 * @param {Number} status 저장 상태(임시 저장 = 0, 저장 완료 =1)
 * @returns resumeList 자소서 리스트
 */
export const getResumeList = async (status: number) => {
  const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
  const { GET_SERVER_ERROR } = RESUME_MESSAGE;

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error(AUTH_REQUIRED);
    }

    const resumeList = await prisma.resume.findMany({
      where: {
        userId: session.user.id,
        status,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return resumeList;
  } catch (error) {
    throw new Error(GET_SERVER_ERROR);
  }
};
