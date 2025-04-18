import { CHARACTER_HISTORY, CHARACTER_HISTORY_KOR } from '@/constants/character-constants';
import { ENV } from '@/constants/env-constants';
import { AUTH_MESSAGE, CHARACTER_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const { PATCH_DATA_FAILED, PATCH_DATA_VALIDATION_ERROR } = CHARACTER_MESSAGE.PATCH;
const { NEXTAUTH_SECRET } = ENV;
const {
  ERROR: { EXPIRED_TOKEN },
} = AUTH_MESSAGE;

export const PATCH = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const { characterId, history } = await request.json();

    const historyData = CHARACTER_HISTORY[history as keyof typeof CHARACTER_HISTORY];

    if (!historyData) {
      return NextResponse.json({ message: PATCH_DATA_VALIDATION_ERROR }, { status: 400 });
    }

    const amount = historyData.amount;

    const historyToKor = CHARACTER_HISTORY_KOR[history as keyof typeof CHARACTER_HISTORY];

    const [updated] = await prisma.$transaction([
      prisma.character.update({
        where: { id: characterId },
        data: { experience: { increment: amount } },
      }),
      prisma.characterHistory.create({
        data: {
          characterId,
          experience: amount,
          history: historyToKor,
        },
      }),
    ]);

    return NextResponse.json({ response: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: PATCH_DATA_FAILED }, { status: 500 });
  }
};
