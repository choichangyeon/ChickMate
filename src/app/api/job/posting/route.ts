import { DB_MESSAGE } from '@/constants/message-constants';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { prisma } from '@/lib/prisma';
import { JobPosting } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET
 */
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { NOT_FOUND_DATA, DB_SERVER_ERROR } = DB_MESSAGE.ERROR;
  const { EDUCATION, TYPE, JOB, MAIN_REGION } = USER_META_DATA_KEY;
  try {
    // searchParams로 정보 가져오기
    const searchParams = req.nextUrl.searchParams;
    const educationLevel = searchParams.get(EDUCATION);
    const location = JSON.parse(searchParams.get('location'));
    const mainRegion = location.mainRegion;
    const experienceType = searchParams.get(TYPE);
    const jobType = searchParams.get(JOB);

    const data: JobPosting[] = await prisma.jobPosting.findMany({
      where: {
        educationLevel,
        experienceType,
        jobType,
        location: {
          path: [MAIN_REGION],
          equals: mainRegion,
        },
      },
    });

    if (!data) {
      return NextResponse.json({ message: NOT_FOUND_DATA }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 500 });
  }
};
