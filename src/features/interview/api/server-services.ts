'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { prisma } from '@/lib/prisma';
import { AUTH_MESSAGE, INTERVIEW_MESSAGE } from '@/constants/message-constants';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { GET_SERVER_ERROR } = INTERVIEW_MESSAGE;

/**
 * 원하는 인터뷰 기록 불러오기 요청
 * @returns data ID에 해당하는 인터뷰 기록
 */
export const getInterviewHistory = async (interviewId: number) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error(AUTH_REQUIRED);
    }

    const response = await prisma.interviewHistory.findUnique({
      where: {
        userId: session.user.id,
        id: interviewId,
      },
      include: {
        resume: {
          select: {
            content: true,
          },
        },
      },
    });

    return response;
  } catch (error) {
    throw new Error(GET_SERVER_ERROR);
  }
};
