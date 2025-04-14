import { NextRequest, NextResponse } from 'next/server';
import type { User } from '@prisma/client';
import { AUTH_MESSAGE, INTERVIEW_HISTORY } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/utils/format-date';
type Props = {
  params: {
    userId: User['id'];
  };
};
const {
  ERROR: { EXPIRED_TOKEN },
} = AUTH_MESSAGE;

const {
  API: { GET_ERROR },
} = INTERVIEW_HISTORY;
export const GET = async (request: NextRequest, { params }: Props) => {
  try {
    const { userId } = params;
    if (!userId) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const histories = await prisma.interviewHistory.findMany({
      where: { userId: userId },
      include: {
        resume: true,
      },
    });

    if (!histories) return NextResponse.json({ data: [] }, { status: 200 });
    const parsedHistories = histories.map((history) => {
      const resumeTitle = history?.resume?.title ?? null;

      return {
        ...history,
        resumeTitle: resumeTitle,
        isFeedbackCompleted: history.feedback ?? false, //@TODO:어떤 형태로 올지 모르겠음.. feedback 있으면 true,없음 false
        createdDate: formatDate({ input: history.createdAt }),
      };
    });
    return NextResponse.json({ data: parsedHistories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: GET_ERROR }, { status: 500 });
  }
};
