import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import { getValidTitle } from '@/features/resume/utils/get-valid-title';
import { ENV } from '@/constants/env-constants';
import type { RouteParams } from '@/types/route-params';
import type { ResumeData } from '@/types/resume';

const { NEXTAUTH_SECRET } = ENV;
const { EXPIRED_TOKEN } = AUTH_MESSAGE.ERROR;
const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { NOT_FOUND, FORBIDDEN, DRAFT_SERVER_ERROR } = RESUME_MESSAGE.DRAFT;

/**
 * 임시 저장된 자소서가 있을 경우 해당 자소서 내용을 수정하는 요청 (임시 저장된 자소서)
 * @param request 자소서에서 변경한 내용
 * @param params resumeId
 */
export const PATCH = async (request: NextRequest, { params }: RouteParams) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const { id: resumeId } = params;
    const id = Number(resumeId);

    const body: ResumeData = await request.json();
    const { title, fieldList } = body;

    const resume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      return NextResponse.json({ message: NOT_FOUND }, { status: 404 });
    }

    if (resume.userId && resume.userId !== session.user.id) {
      return NextResponse.json({ message: FORBIDDEN }, { status: 403 });
    }

    const response = await prisma.resume.update({
      where: { id },
      data: {
        userId: session.user.id,
        title: getValidTitle(title),
        content: fieldList,
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DRAFT_SERVER_ERROR }, { status: 500 });
  }
};
