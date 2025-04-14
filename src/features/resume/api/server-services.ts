'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { prisma } from '@/lib/prisma';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import { RESUME_STATUS } from '@/constants/resume-constants';

/**
 * 임시 저장된 자소서 불러오기 요청
 * @returns data 임시 저장된 자소서 리스트
 */
export const getDraftResumeList = async () => {
  const { DRAFT } = RESUME_STATUS;
  const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
  const { GET_SERVER_ERROR } = RESUME_MESSAGE;

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error(AUTH_REQUIRED);
    }

    const data = await prisma.resume.findMany({
      where: {
        userId: session.user.id,
        status: DRAFT,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return data;
  } catch (error) {
    throw new Error(GET_SERVER_ERROR);
  }
};
