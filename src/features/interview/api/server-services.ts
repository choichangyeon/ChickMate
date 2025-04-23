'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { prisma } from '@/lib/prisma';
import { AUTH_MESSAGE, INTERVIEW_HISTORY } from '@/constants/message-constants';
import { INTERVIEW_HISTORY_STATUS } from '@/constants/interview-constants';
import { InterviewHistoryType } from '@/types/DTO/interview-history-dto';

const { GET_ERROR } = INTERVIEW_HISTORY.API;
const { SESSION_NO_USER } = AUTH_MESSAGE.ERROR;
const { IN_PROGRESS } = INTERVIEW_HISTORY_STATUS;

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

/**
 *
 * @returns InProgress 상태의 인터뷰 히스토리 가져오기
 */
export const getInterviewHistoryAboutInProgress = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error(SESSION_NO_USER);
    }

    const response = await prisma.interviewHistory.findMany({
      where: {
        userId: session.user.id,
        status: IN_PROGRESS,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // const test: InterviewHistoryType[] = [];
    // if (test === null) {
    //   return null;
    // }

    return response[0];
  } catch (error) {
    throw new Error(GET_ERROR);
  }
};
