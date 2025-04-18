import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { prisma } from '@/lib/prisma';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import { SEARCH_PARAMS } from '@/constants/resume-constants';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { NOT_FOUND, GET_SERVER_ERROR } = RESUME_MESSAGE;
const { STATUS } = SEARCH_PARAMS;

export const GET = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    const status = request.nextUrl.searchParams.get(STATUS);

    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const response = await prisma.resume.findMany({
      where: {
        userId: session.user.id,
        status: Number(status),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!response) {
      return NextResponse.json({ message: NOT_FOUND }, { status: 404 });
    }

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: GET_SERVER_ERROR }, { status: 500 });
  }
};
