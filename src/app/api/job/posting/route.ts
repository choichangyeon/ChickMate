import { AUTH_MESSAGE, DB_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { NextRequest, NextResponse } from 'next/server';
import { JobPosting } from '@prisma/client';
import { educationOrder } from '@/constants/education-constants';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { ENV } from '@/constants/env-constants';
import { getToken } from 'next-auth/jwt';

const { NEXTAUTH_SECRET } = ENV;
const {
  VALIDATION: { USER_ID_VALIDATION },
} = DB_MESSAGE;
const {
  ERROR: { EXPIRED_TOKEN },
} = AUTH_MESSAGE;
/**
 * GET
 */
export const GET = async (request: NextRequest) => {
  const { DB_REQUEST_ERROR, DB_SERVER_ERROR, DB_URL_ERROR } = DB_MESSAGE.ERROR;
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: USER_ID_VALIDATION }, { status: 401 });
    }

    const userId = session.user.id;
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
    const postings: (JobPosting & {
      userSelectedJobs: { id: number }[];
    })[] = await prisma.jobPosting.findMany({
      where: {
        requiredEducationCode: {
          lte: userLevelNum,
        },
        experienceName: {
          contains: experienceName,
        },
        jobMidCodeName: {
          contains: jobMidCodeName,
        },
        locationName: {
          contains: locationName,
        },
        expirationTimestamp: {
          gte: Math.floor(Date.now() / 1000),
        },
      },
      orderBy: {
        expirationTimestamp: 'asc',
      },
      include: {
        userSelectedJobs: {
          where: { userId },
          select: { id: true },
        },
      },
    });
    const response = postings.map((post) => {
      const { userSelectedJobs, ...rest } = post;
      return {
        ...rest,
        isBookmarked: userSelectedJobs.length > 0,
      };
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 500 });
  }
};
