import { DB_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const { USER_ID_VALIDATION, JOB_POSTING_ID_VALIDATION } = DB_MESSAGE.VALIDATION;
const { DB_SERVER_ERROR } = DB_MESSAGE.ERROR;

/**
 * POST 요청 함수
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { user } = await getServerSession(authOptions);
    const { jobPostingId } = await request.json();
    const userId = user.id;

    if (!userId) {
      return NextResponse.json({ message: USER_ID_VALIDATION }, { status: 400 });
    }
    if (!jobPostingId) {
      return NextResponse.json({ message: JOB_POSTING_ID_VALIDATION }, { status: 400 });
    }

    const data = await prisma.userSelectedJob.create({
      data: {
        userId,
        jobPostingId,
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 503 });
  }
};

/**
 * DELETE 요청 함수
 */
export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { user } = await getServerSession(authOptions);
    const { jobPostingId } = await request.json();
    const userId = user.id;

    if (!userId) {
      return NextResponse.json({ message: USER_ID_VALIDATION }, { status: 400 });
    }
    if (!jobPostingId) {
      return NextResponse.json({ message: JOB_POSTING_ID_VALIDATION }, { status: 400 });
    }

    const data = await prisma.userSelectedJob.deleteMany({
      where: {
        userId,
        jobPostingId,
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 503 });
  }
};

/**
 * GET 요청 함수
 */
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { user } = await getServerSession(authOptions);
    const searchParams = request.nextUrl.searchParams;
    const userId = user.id;
    const jobPostingId = Number(searchParams.get('jobPostingId'));

    if (!userId) {
      return NextResponse.json({ message: USER_ID_VALIDATION }, { status: 400 });
    }
    if (!jobPostingId) {
      return NextResponse.json({ message: JOB_POSTING_ID_VALIDATION }, { status: 400 });
    }

    const data = await prisma.userSelectedJob.findMany({
      where: { userId, jobPostingId },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 500 });
  }
};
