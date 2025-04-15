'use server';

import { AUTH_MESSAGE } from '@/constants/message-constants';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { prisma } from '@/lib/prisma';
import { User } from '@/types/user';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { authOptions } from '@/utils/auth-option';
import { JobPosting } from '@prisma/client';
import { getServerSession } from 'next-auth';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { MAIN_REGION } = USER_META_DATA_KEY;

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

  const response: JobPosting[] = await prisma.jobPosting.findMany({
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

  const jobPostingList: JobPosting[] = response;

  return jobPostingList;
};
