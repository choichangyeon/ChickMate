import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST 요청 함수
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { user } = await getServerSession(authOptions);
    const { jobPostingId } = await request.json();
    const userId = user.id;

    if (!userId || !jobPostingId) {
      // 유효성 검사 TODO : 에러 메시지 상수화
      return NextResponse.json({ message: 'INVALID_DATA' }, { status: 400 });
    }

    const data = await prisma.userSelectedJob.create({
      data: {
        userId,
        jobPostingId,
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    // TODO : 에러 메시지 상수화
    return NextResponse.json({ message: 'SERVER_ERROR' }, { status: 503 });
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

    if (!userId || !jobPostingId) {
      // 유효성 검사 TODO : 에러 메시지 상수화
      return NextResponse.json({ message: 'INVALID_DATA' }, { status: 400 });
    }

    const data = await prisma.userSelectedJob.deleteMany({
      where: {
        userId,
        jobPostingId,
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    // TODO : 에러 메시지 상수화
    return NextResponse.json({ message: 'SERVER_ERROR' }, { status: 503 });
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

    if (!userId || !jobPostingId) {
      // 유효성 검사 TODO : 에러 메시지 상수화
      return NextResponse.json({ message: 'INVALID_DATA' }, { status: 400 });
    }

    const data = await prisma.userSelectedJob.findMany({
      where: { userId, jobPostingId },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('데이터 조회 에러:', error);
    return NextResponse.json({ error: '데이터 항목을 가져오는데 실패했습니다.' }, { status: 500 });
  }
};
