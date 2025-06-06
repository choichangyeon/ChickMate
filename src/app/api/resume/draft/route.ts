import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { ENV } from '@/constants/env-constants';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import { RESUME_STATUS } from '@/constants/resume-constants';
import { getValidTitle } from '@/features/resume/utils/get-valid-title';
import type { ResumeData } from '@/types/resume';

const { NEXTAUTH_SECRET } = ENV;
const { EXPIRED_TOKEN } = AUTH_MESSAGE.ERROR;
const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { REQUEST_FAILURE, SUBMIT_SERVER_ERROR } = RESUME_MESSAGE.SUBMIT;
const { DRAFT } = RESUME_STATUS;

/**
 * 임시 저장한 자소서 등록하는 요청
 * @param request 자소서 제목, 자소서 질문/답변
 */
export const POST = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const body: ResumeData = await request.json();
    const { title, fieldList } = body;

    if (!fieldList) {
      return NextResponse.json({ message: REQUEST_FAILURE }, { status: 400 });
    }

    const response = await prisma.resume.create({
      data: {
        userId: session.user.id,
        status: DRAFT,
        title: getValidTitle(title),
        content: fieldList,
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: SUBMIT_SERVER_ERROR }, { status: 500 });
  }
};
