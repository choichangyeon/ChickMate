import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { AUTH_MESSAGE, INTERVIEW_MESSAGE } from '@/constants/message-constants';
import type { JsonArray } from '@prisma/client/runtime/library';
import type { RouteParams } from '@/types/route-params';
import type { InterviewQnAData } from '@/types/interview';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { NOT_FOUND, FORBIDDEN, PATCH_SERVER_ERROR } = INTERVIEW_MESSAGE;

/**
 * 인터뷰 질문/답변 업데이트하는 요청
 * @param request 인터뷰 질문/답변 1쌍
 * @param params interviewId
 */
export const PATCH = async (request: Request, { params }: RouteParams) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const { id: interviewId } = params;
    const id = Number(interviewId);

    const body: InterviewQnAData = await request.json();

    const interviewHistory = await prisma.interviewHistory.findUnique({
      where: { id },
    });

    const prevContent = (interviewHistory?.content as JsonArray) || [];
    const updateContent = [...prevContent, body];

    if (!interviewHistory) {
      return NextResponse.json({ message: NOT_FOUND }, { status: 404 });
    }
    if (interviewHistory.userId && interviewHistory.userId !== session.user.id) {
      return NextResponse.json({ message: FORBIDDEN }, { status: 403 });
    }

    const response = await prisma.interviewHistory.update({
      where: { id },
      data: {
        userId: session.user.id,
        content: updateContent,
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: PATCH_SERVER_ERROR }, { status: 500 });
  }
};
