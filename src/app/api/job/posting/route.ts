import { DB_MESSAGE } from '@/constants/message-constants';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { prisma } from '@/lib/prisma';
import { JobPosting } from '@/types/job-posting';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET
 */
// TODO: 필터링 기준 상수화
const educationOrder = {
  '학력무관': 0,
  '고졸': 1,
  '대졸(2~3년)': 2,
  '대졸(4년)': 3,
  '석사': 4,
  '박사': 5,
};

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const { DB_REQUEST_ERROR, DB_SERVER_ERROR, DB_URL_ERROR } = DB_MESSAGE.ERROR;
  const { MAIN_REGION } = USER_META_DATA_KEY;
  try {
    // searchParams로 정보 가져오기
    // TODO: mainRegion -> location으로 바꾸기
    const searchParams = request.nextUrl.searchParams;
    const { educationLevel, mainRegion, experienceType, jobType } = sanitizeQueryParams(searchParams);

    if (!searchParams) {
      return NextResponse.json({ message: DB_URL_ERROR }, { status: 400 });
    }

    if (!educationLevel || !mainRegion || !experienceType || !jobType) {
      return NextResponse.json({ message: DB_REQUEST_ERROR }, { status: 400 });
    }

    // const mainRegion = JSON.parse(location).mainRegion;
    const userLevelNum = educationOrder[educationLevel as keyof typeof educationOrder];
    const response: JobPosting[] = await prisma.jobPosting.findMany({
      where: {
        educationLevel: {
          in: Object.entries(educationOrder)
            .filter(([_, levelNum]) => levelNum <= userLevelNum)
            .map(([key]) => key),
        },
        experienceType,
        jobType,
        location: {
          path: [MAIN_REGION],
          equals: mainRegion,
        },
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 500 });
  }
};
