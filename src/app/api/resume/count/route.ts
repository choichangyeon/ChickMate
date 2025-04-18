import { ENV } from '@/constants/env-constants';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const { NEXTAUTH_SECRET } = ENV;
const {
  ERROR: { EXPIRED_TOKEN },
  RESULT: { AUTH_REQUIRED },
} = AUTH_MESSAGE;
const { GET_COUNT_ERROR } = RESUME_MESSAGE;
const MAX_COUNT_TO_GET_EXP_DURING_A_DAY = 3;
export const GET = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const response = await prisma.resume.count({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    if (response <= MAX_COUNT_TO_GET_EXP_DURING_A_DAY) {
      return NextResponse.json({ response: { isAbleToGetEXP: true } }, { status: 200 });
    }
    return NextResponse.json({ response: { isAbleToGetEXP: false } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: GET_COUNT_ERROR }, { status: 500 });
  }
};
