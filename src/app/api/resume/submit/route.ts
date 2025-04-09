import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import { RESUME_STATUS } from '@/constants/resume-constants';
import type { ResumeData } from '@/types/resume';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { REQUEST_FAILURE, SUBMIT_SERVER_ERROR } = RESUME_MESSAGE.SUBMIT;
const { SUBMIT } = RESUME_STATUS;

/**
 * 자소서 등록하는 요청
 * @param request 자소서 제목, 자소서 질문/답변
 */
export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const body: ResumeData = await request.json();
    const { title, fieldList } = body;

    if (!title || !fieldList) {
      return NextResponse.json({ message: REQUEST_FAILURE }, { status: 400 });
    }

    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        status: SUBMIT,
        title,
        content: fieldList,
      },
    });

    return NextResponse.json({ newResume }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: SUBMIT_SERVER_ERROR }, { status: 500 });
  }
};
