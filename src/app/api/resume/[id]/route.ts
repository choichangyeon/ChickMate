import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { prisma } from '@/lib/prisma';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import type { RouteParams } from '@/types/route-params';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { NOT_FOUND, GET_SERVER_ERROR, DELETE_REQUEST_SUCCESS, DELETE_FORBIDDEN, DELETE_SERVER_ERROR } = RESUME_MESSAGE;

/**
 * 자소서 조회 요청
 */
export const GET = async (request: Request, { params }: RouteParams) => {
  const resumeId = Number(params.id);

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const response = await prisma.resume.findUnique({
      where: {
        userId: session.user.id,
        id: resumeId,
      },
    });

    if (!response) {
      return NextResponse.json({ message: NOT_FOUND }, { status: 404 });
    }

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ message: GET_SERVER_ERROR }, { status: 500 });
  }
};

/**
 * 자소서 삭제 요청
 */
export const DELETE = async (request: Request, { params }: RouteParams) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const { id: resumeId } = params;
    const id = Number(resumeId);

    const resume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      return NextResponse.json({ message: NOT_FOUND }, { status: 404 });
    }

    if (resume.userId && resume.userId !== session.user.id) {
      return NextResponse.json({ message: DELETE_FORBIDDEN }, { status: 403 });
    }

    await prisma.resume.delete({
      where: { id },
    });

    return NextResponse.json({ message: DELETE_REQUEST_SUCCESS });
  } catch (error) {
    return NextResponse.json({ message: DELETE_SERVER_ERROR }, { status: 500 });
  }
};
