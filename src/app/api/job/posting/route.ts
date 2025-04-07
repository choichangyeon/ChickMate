import { DB_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET
 */
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { NOT_FOUND_DATA, DB_SERVER_ERROR } = DB_MESSAGE.ERROR;
  //   const {} = await req.json();
  try {
    // TODO : prisma 로직 재구현
    // const data = await prisma.sample.findMany({});
    const data = [
      {
        id: 12,
        company: '삼성물산',
        url: 'www.naver.com',
      },
    ];

    if (!data) {
      return NextResponse.json({ message: NOT_FOUND_DATA }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 500 });
  }
};
