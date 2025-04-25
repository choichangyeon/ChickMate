import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '@/utils/auth-option';
import { ENV } from '@/constants/env-constants';
import { CHARACTER_HISTORY_KOR } from '@/constants/character-constants';
import { AUTH_MESSAGE, BOOKMARK_MESSAGE } from '@/constants/message-constants';

const { NEXTAUTH_SECRET } = ENV;
const {
  ERROR: { EXPIRED_TOKEN },
  RESULT: { AUTH_REQUIRED },
} = AUTH_MESSAGE;
const { GET_COUNT_ERROR } = BOOKMARK_MESSAGE;

const { BOOKMARK_JOB_POSTING } = CHARACTER_HISTORY_KOR;
const MAX_COUNT_TO_GET_EXP_DURING_A_DAY = 5;

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
      // TODO: 캐릭터가 없을 시 어떤 상태값을 반환할 지 고민이 필요함
      return NextResponse.json({ response: { isAbleToGetEXP: false } }, { status: 200 });
    }

    const response = await prisma.characterHistory.count({
      where: {
        characterId: characterId.id,
        history: BOOKMARK_JOB_POSTING,
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
