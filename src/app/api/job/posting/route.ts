import { AUTH_MESSAGE, DB_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { NextRequest, NextResponse } from 'next/server';
import { educationOrder } from '@/constants/education-constants';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { ENV } from '@/constants/env-constants';
import { getToken } from 'next-auth/jwt';

type OrderByCondition = {
  [key: string]: 'asc' | 'desc';
};

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
    const searchParams = request.nextUrl.searchParams;
    const { requiredEducationName, locationName, experienceName, jobMidCodeName, sortOption, page, limit } =
      sanitizeQueryParams(searchParams);

    if (!searchParams) {
      return NextResponse.json({ message: DB_URL_ERROR }, { status: 400 });
    }

    if (
      !requiredEducationName ||
      !locationName ||
      !experienceName ||
      !jobMidCodeName ||
      !sortOption ||
      !page ||
      !limit
    ) {
      return NextResponse.json({ message: DB_REQUEST_ERROR }, { status: 400 });
    }

    let orderByCondition: OrderByCondition = {};

    switch (sortOption) {
      case 'latest':
        orderByCondition = { createdAt: 'desc' };
        break;
      case 'oldest':
        orderByCondition = { createdAt: 'asc' };
        break;
      case 'deadline':
        orderByCondition = { expirationTimestamp: 'asc' };
        break;
      case 'company':
        orderByCondition = { companyName: 'asc' };
        break;
      default:
        orderByCondition = { createdAt: 'desc' };
    }

    const userLevelNum = educationOrder[requiredEducationName as keyof typeof educationOrder];

    const whereCondition = {
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
      ...(sortOption === 'bookmark' && {
        userSelectedJobs: {
          some: { userId },
        },
      }),
    };

    const [postings, totalCount] = await Promise.all([
      prisma.jobPosting.findMany({
        where: whereCondition,
        orderBy: orderByCondition,
        include: {
          userSelectedJobs: {
            where: { userId },
            select: { id: true },
          },
        },
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
      }),
      prisma.jobPosting.count({
        where: whereCondition,
      }),
    ]);

    const response = postings.map((post) => {
      const { userSelectedJobs, ...rest } = post;
      return {
        ...rest,
        isBookmarked: userSelectedJobs.length > 0,
      };
    });

    return NextResponse.json({ response, totalCount }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 500 });
  }
};
