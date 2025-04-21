'use server';

import { educationOrder } from '@/constants/education-constants';
import { AUTH_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { authOptions } from '@/utils/auth-option';
import { JobPosting } from '@prisma/client';
import { getServerSession } from 'next-auth';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;

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
    },
    include: {
      userSelectedJobs: {
        where: { userId },
        select: { id: true },
      },
    },
  });

  const jobPostingList = postings.map((post) => {
    const { userSelectedJobs, ...rest } = post;
    return {
      ...rest,
      isBookmarked: userSelectedJobs.length > 0,
    };
  });

  return jobPostingList;
};
