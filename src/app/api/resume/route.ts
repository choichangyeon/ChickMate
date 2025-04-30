import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { prisma } from '@/lib/prisma';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import { SEARCH_PARAMS } from '@/constants/resume-constants';
import { ENV } from '@/constants/env-constants';
import { getToken } from 'next-auth/jwt';

const { NEXTAUTH_SECRET } = ENV;
const { EXPIRED_TOKEN } = AUTH_MESSAGE.ERROR;
const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { NOT_FOUND, GET_SERVER_ERROR } = RESUME_MESSAGE;
const { STATUS } = SEARCH_PARAMS;

export const GET = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const status = request.nextUrl.searchParams.get(STATUS);

    const response = await prisma.resume.findMany({
      where: {
        userId: session.user.id,
        status: Number(status),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: GET_SERVER_ERROR }, { status: 500 });
  }
};
