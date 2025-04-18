import { DB_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { NextRequest, NextResponse } from 'next/server';
import { JobPosting } from '@prisma/client';

// TODO: 필터링 기준 상수화
const educationOrder = {
  '학력무관': 0,
  '고등학교졸업': 1,
  '대학졸업(2,3년)': 2,
  '대학교졸업(4년)': 3,
  '석사졸업': 4,
  '박사졸업': 5,
};

/**
 * GET
 */
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const { DB_REQUEST_ERROR, DB_SERVER_ERROR, DB_URL_ERROR } = DB_MESSAGE.ERROR;
  try {
    // searchParams로 정보 가져오기
    const searchParams = request.nextUrl.searchParams;
    const { requiredEducationName, locationName, experienceName, jobMidCodeName } = sanitizeQueryParams(searchParams);

    if (!searchParams) {
      return NextResponse.json({ message: DB_URL_ERROR }, { status: 400 });
    }

    if (!requiredEducationName || !locationName || !experienceName || !jobMidCodeName) {
      return NextResponse.json({ message: DB_REQUEST_ERROR }, { status: 400 });
    }

    // const mainRegion = JSON.parse(location).mainRegion;
    const userLevelNum = educationOrder[requiredEducationName as keyof typeof educationOrder];
    const response: JobPosting[] = await prisma.jobPosting.findMany({
      where: {
        requiredEducationCode: {
          lte: userLevelNum,
        },
        experienceName,
        jobMidCodeName,
        locationName: {
          contains: locationName,
        },
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 500 });
  }
};
