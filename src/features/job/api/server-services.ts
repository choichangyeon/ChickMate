'use server';

import { AUTH_MESSAGE } from '@/constants/message-constants';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { prisma } from '@/lib/prisma';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { authOptions } from '@/utils/auth-option';
import { JobPosting } from '@prisma/client';
import { getServerSession } from 'next-auth';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { MAIN_REGION } = USER_META_DATA_KEY;

// TODO: 필터링 기준 상수화
const educationOrder = {
  '학력무관': 0,
  '고졸': 1,
  '대졸(2~3년)': 2,
  '대졸(4년)': 3,
  '석사': 4,
  '박사': 5,
};

export const getJobByUserMetaData = async (): Promise<JobPosting[]> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error(AUTH_REQUIRED);
  }

  const userId = session.user.id;

  const userData = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userData) return [];

  // TODO : mainRegion -> location으로 바꾸기
  const { educationLevel, mainRegion, experienceType, jobType } = userData.userMetaData as UserMetaDataType;
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

  const jobPostingList: JobPosting[] = response;

  return jobPostingList;
};
