import { CHARACTER_HISTORY_KOR } from '@/constants/character-constants';
import { ENV } from '@/constants/env-constants';
import { AUTH_MESSAGE, CHARACTER_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const { NEXTAUTH_SECRET } = ENV;
const { RESUME_SUBMISSION } = CHARACTER_HISTORY_KOR;
const {
  ERROR: { EXPIRED_TOKEN },
  RESULT: { AUTH_REQUIRED },
} = AUTH_MESSAGE;
const { GET_COUNT_ERROR } = RESUME_MESSAGE;
const { INFO: GET_DATA_NULL } = CHARACTER_MESSAGE;
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

    const characterId = await prisma.character.findFirst({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!characterId) {
      return NextResponse.json({ response: { isAbleToGetEXP: false } }, { status: 200 });
    }

    const response = await prisma.characterHistory.count({
      where: {
        characterId: characterId.id,
        history: RESUME_SUBMISSION,
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
