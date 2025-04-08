'use server';

import { prisma } from '@/lib/prisma';
import { RESUME_STATUS } from '@/constants/resume-constants';

/**
 * 임시 저장된 자소서 불러오기 요청
 * @returns draftResumeList 임시 저장된 자소서 리스트
 */
export const getDraftResumeList = async () => {
  const { DRAFT } = RESUME_STATUS;

  try {
    const data = await prisma.resume.findMany({
      where: { status: DRAFT },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!data) {
      return [];
    }

    return data;
  } catch (error) {
    throw new Error('자기소개서를 가져오는데 실패했습니다.');
  }
};
