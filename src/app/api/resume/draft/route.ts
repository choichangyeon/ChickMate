import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { AUTH_MESSAGE, RESUME_MESSAGE } from '@/constants/message-constants';
import { RESUME_STATUS } from '@/constants/resume-constants';
import type { Field } from '@/types/resume';

type RequestBody = {
  title: string;
  fieldList: Field[];
};

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { REQUEST_FAILURE, SUBMIT_SERVER_ERROR } = RESUME_MESSAGE.SUBMIT;
const { NOT_FOUND, FORBIDDEN, DRAFT_SERVER_ERROR } = RESUME_MESSAGE.DRAFT;
const { DRAFT } = RESUME_STATUS;

/**
 * 임시 저장한 자소서 등록하는 요청
 * @param request 자소서 제목, 자소서 질문/답변
 */
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: AUTH_REQUIRED }, { status: 403 });
  }

  try {
    const body: RequestBody = await request.json();
    const { title, fieldList } = body;

    if (!title || !fieldList) {
      return NextResponse.json({ message: REQUEST_FAILURE }, { status: 400 });
    }

    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        status: DRAFT,
        title,
        content: fieldList,
      },
    });

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: SUBMIT_SERVER_ERROR }, { status: 500 });
  }
}

type RouteParams = {
  params: {
    id: string;
  };
};

/**
 * 수정된 자소서 내용을 등록하는 요청
 * @param request 자소서에서 변경한 내용
 * @param params resumeId
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: AUTH_REQUIRED }, { status: 403 });
  }

  try {
    const { id: resumeId } = params;
    const id = Number(resumeId);
    const { title, content, isDone } = await request.json();

    const resume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      return NextResponse.json({ message: NOT_FOUND }, { status: 404 });
    }

    if (resume.userId && resume.userId !== session.user.id) {
      return NextResponse.json({ message: FORBIDDEN }, { status: 403 });
    }

    const updatedTodo = await prisma.resume.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(isDone !== undefined && { isDone }),
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ message: DRAFT_SERVER_ERROR }, { status: 500 });
  }
}
