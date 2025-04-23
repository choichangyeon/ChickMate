import { ENV } from '@/constants/env-constants';
import { AUTH_MESSAGE, DB_MESSAGE, HISTORY_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const {
  VALIDATION: { USER_ID_VALIDATION },
  ERROR: { DB_SERVER_ERROR },
} = DB_MESSAGE;
const {
  ERROR: { EXPIRED_TOKEN },
} = AUTH_MESSAGE;
const { NEXTAUTH_SECRET } = ENV;
const {
  VALIDATION: { QUERY_PARAMS_TYPE },
} = HISTORY_MESSAGE;
/**
 * GET 요청 함수
 */
export const GET = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: USER_ID_VALIDATION }, { status: 401 });
    }

    const userId = session.user.id;
    const searchParams = request.nextUrl.searchParams;
    const { page, limit } = sanitizeQueryParams(searchParams);
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      return NextResponse.json({ message: QUERY_PARAMS_TYPE }, { status: 400 });
    }

    const bookmarks = await prisma.userSelectedJob.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        jobPosting: true,
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const totalCount = await prisma.userSelectedJob.count({
      where: { userId },
    });
    const nextPage = pageNumber * limitNumber < totalCount ? pageNumber + 1 : null;
    if (!bookmarks) return NextResponse.json({ response: [], nextPage }, { status: 200 });

    return NextResponse.json({ response: bookmarks, nextPage }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 500 });
  }
};
