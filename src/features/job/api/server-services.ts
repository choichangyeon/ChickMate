'use server';

import { AUTH_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { authOptions } from '@/utils/auth-option';
import { JobPosting } from '@prisma/client';
import { getServerSession } from 'next-auth';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;

// TODO: 필터링 기준 상수화
const educationOrder = {
  '학력무관': 0,
  '고등학교졸업': 1,
  '대학졸업(2,3년)': 2,
  '대학교졸업(4년)': 3,
  '석사졸업': 4,
  '박사졸업': 5,
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

  const { requiredEducationName, locationName, experienceName, jobMidCodeName } =
    userData.userMetaData as UserMetaDataType;
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

  const jobPostingList: JobPosting[] = response;

  return jobPostingList;
};
