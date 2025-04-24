import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { ENV } from '@/constants/env-constants';
import { AUTH_MESSAGE, TAB_COUNT_MESSAGE } from '@/constants/message-constants';
import { INIT_TAB_COUNTS, TABS } from '@/constants/my-page-constants';
import { INTERVIEW_HISTORY_STATUS } from '@/constants/interview-constants';
import { RESUME_STATUS } from '@/constants/resume-constants';
import type { UserType } from '@/types/DTO/user-dto';

const { NEXTAUTH_SECRET } = ENV;

const {
  ERROR: { EXPIRED_TOKEN },
} = AUTH_MESSAGE;

const {
  API: { SERVER_ERROR },
} = TAB_COUNT_MESSAGE;

const { INTERVIEW_HISTORY_TAB, RESUME_TAB, BOOKMARK_TAB } = TABS;

const { COMPLETED } = INTERVIEW_HISTORY_STATUS;
const { SUBMIT } = RESUME_STATUS;

type Props = {
  params: {
    userId: UserType['id'];
  };
};
export const GET = async (request: NextRequest, { params }: Props) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });
    const { userId } = params;
    const res = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        _count: {
          select: {
            [RESUME_TAB]: {
              where: {
                status: SUBMIT,
              },
            },
            [BOOKMARK_TAB]: true,
            [INTERVIEW_HISTORY_TAB]: {
              where: {
                status: COMPLETED,
              },
            },
          },
        },
      },
    });

    const tabCounts = res?._count ?? INIT_TAB_COUNTS;

    return NextResponse.json({ response: tabCounts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
