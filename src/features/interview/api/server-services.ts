'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { prisma } from '@/lib/prisma';
import { AUTH_MESSAGE, INTERVIEW_HISTORY } from '@/constants/message-constants';

const { GET_ERROR } = INTERVIEW_HISTORY.API;
const { SESSION_NO_USER } = AUTH_MESSAGE.ERROR;

/**
 * 원하는 인터뷰 기록 불러오기 요청
 * @returns data ID에 해당하는 인터뷰 기록
 */
export const getInterviewHistory = async (interviewId: number) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error(SESSION_NO_USER);
    }

    const response = await prisma.interviewHistory.findUnique({
      where: {
        userId: session.user.id,
        id: interviewId,
      },
    });

    return response;
  } catch (error) {
    throw new Error(GET_ERROR);
  }
};

/**
 *
 * @param interviewId
 * @returns data ID에 해당하는 QnA 기록
 */
export const getInterviewQnA = async (interviewId: number) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error(SESSION_NO_USER);
    }

    const response = await prisma.interviewQnA.findMany({
      where: {
        interviewHistoryId: interviewId,
        interviewHistory: {
          userId: session.user.id,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return response;
  } catch (error) {
    throw new Error(GET_ERROR);
  }
};
