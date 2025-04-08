import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST 요청 함수
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { user } = await getServerSession(authOptions);
  const { jobPostingId } = await req.json();
  const userId = user.id;

  if (!userId || !jobPostingId) {
    // 유효성 검사 TODO : 에러 메시지 상수화
    return NextResponse.json({ message: 'INVALID_DATA' }, { status: 400 });
  }
  try {
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
