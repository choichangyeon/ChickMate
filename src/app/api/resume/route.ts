import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { RESUME_MESSAGE } from '@/constants/message-constants';
import type { Field } from '@/types/resume';
import { RESUME_STATUS } from '@/constants/resume-constants';

type RequestBody = {
  title: string;
  fieldList: Field[];
};

const { REQUEST_FAILURE, SERVER_ERROR } = RESUME_MESSAGE.SUBMIT;
const { SUBMIT } = RESUME_STATUS;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '사용자 인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const body: RequestBody = await request.json();
    const { title, fieldList } = body;

    if (!title || !fieldList || !Array.isArray(fieldList)) {
      return NextResponse.json({ error: REQUEST_FAILURE }, { status: 400 });
    }

    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        status: SUBMIT,
        title,
        content: fieldList,
      },
    });

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: SERVER_ERROR }, { status: 500 });
  }
}
