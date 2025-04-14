import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RouteParams } from '@/types/route-params';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { AUTH_MESSAGE, HISTORY_MESSAGE } from '@/constants/message-constants';
import { ENV } from '@/constants/env-constants';
import { getToken } from 'next-auth/jwt';

const { NEXTAUTH_SECRET } = ENV;
const {
  VALIDATION: { QUERY_PARAMS_TYPE },
  GET_SERVER_ERROR,
} = HISTORY_MESSAGE;
const {
  ERROR: { EXPIRED_TOKEN },
} = AUTH_MESSAGE;

export const GET = async (request: NextRequest, { params }: RouteParams) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const searchParams = request.nextUrl.searchParams;
    const characterId = Number(params.id);

    const { page, limit } = sanitizeQueryParams(searchParams);
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      return NextResponse.json({ message: QUERY_PARAMS_TYPE }, { status: 400 });
    }

    // 캐릭터 아이디를 기준으로 히스토리 가져오기
    const histories = await prisma.characterHistory.findMany({
      where: { characterId },
      orderBy: { createdAt: 'desc' },
      skip: (pageNumber - 1) * limitNumber, // page에 맞는 시작점 계산
      take: limitNumber, // 페이지 당 항목 수
    });

    // 총 히스토리 개수로 전체 페이지 수 계산
    const totalCount = await prisma.characterHistory.count({
      where: { characterId },
    });

    // 다음 페이지가 있을 경우 다음 페이지 번호 반환
    const nextPage = pageNumber * limitNumber < totalCount ? page + 1 : null;

    return NextResponse.json(
      {
        response: { histories, nextPage },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: GET_SERVER_ERROR }, { status: 500 });
  }
};
