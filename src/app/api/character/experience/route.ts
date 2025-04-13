import { CHARACTER_HISTORY, CHARACTER_HISTORY_KEY, CHARACTER_HISTORY_KOR } from '@/constants/character-constants'; // HISTORY 객체를 가져옵니다.
import { AUTH_MESSAGE, CHARACTER_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const { PATCH_DATA_FAILED } = CHARACTER_MESSAGE.PATCH;
const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { LOGIN, RESUME_SUBMISSION, INTERVIEW_COMPLETION, JOB_BOOKMARK, GENERAL_HISTORY } = CHARACTER_HISTORY_KEY;

export const PATCH = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const { characterId, history } = await request.json();

    const historyData = CHARACTER_HISTORY[history as keyof typeof CHARACTER_HISTORY];

    if (!historyData) {
      return NextResponse.json({ message: '유효하지 않은 히스토리입니다.' }, { status: 400 });
    }

    const amount = historyData.amount;

    const historyToKor = CHARACTER_HISTORY_KOR[history as keyof typeof CHARACTER_HISTORY];

    if (history === LOGIN) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const alreadyLoggedIn = await prisma.characterHistory.findFirst({
        where: {
          characterId,
          history: historyToKor,
          createdAt: { gte: todayStart },
        },
      });

      if (alreadyLoggedIn) {
        return NextResponse.json({ message: '오늘은 이미 로그인 보상을 받았습니다.' }, { status: 200 });
      }
    }

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

    return NextResponse.json({ updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: PATCH_DATA_FAILED }, { status: 500 });
  }
};
