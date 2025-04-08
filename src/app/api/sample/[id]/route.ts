import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';

type RouteParams = {
  params: {
    id: string;
  };
};

// 프리즈마

/**
 * GET: 단일 항목 조회
 */
export const GET = async (request: Request, { params }: RouteParams) => {
  try {
    const { id: sampleId } = params;
    const id = Number(sampleId);
    const data = await prisma.sample.findMany({
      where: { id },
    });

    if (!data) {
      return NextResponse.json({ message: '데이터 항목을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('데이터 조회 에러:', error);
    return NextResponse.json({ message: '데이터 항목을 가져오는데 실패했습니다.' }, { status: 500 });
  }
};

/**
 * POST: 새로운 항목 생성 (로그인 필요)
 */
export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json({ message: '제목은 필수 항목입니다.' }, { status: 400 });
    }

    const newSample = await prisma.sample.create({
      data: {
        title,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newSample, { status: 201 });
  } catch (error) {
    console.error('Todo 생성 에러:', error);
    return NextResponse.json({ message: 'Sample 항목 생성에 실패했습니다.' }, { status: 500 });
  }
};

/**
 * PATCH: 항목 수정 (로그인 필요, 자신의 항목만)
 */
export const PATCH = async (request: Request, { params }: RouteParams) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id: sampleId } = params;
    const id = Number(sampleId);
    const { title, content, isDone } = await request.json();

    const sample = await prisma.sample.findUnique({
      where: { id },
    });

    if (!sample) {
      return NextResponse.json({ message: 'Todo 항목을 찾을 수 없습니다.' }, { status: 404 });
    }

    if (sample.userId && sample.userId !== session.user.id) {
      return NextResponse.json({ message: '이 Todo 항목을 수정할 권한이 없습니다.' }, { status: 403 });
    }

    const updatedTodo = await prisma.sample.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(isDone !== undefined && { isDone }),
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Todo 수정 에러:', error);
    return NextResponse.json({ message: 'Todo 항목 수정에 실패했습니다.' }, { status: 500 });
  }
};

/**
 * DELETE: 항목 삭제 (로그인 필요, 자신의 항목만)
 */
export const DELETE = async (request: Request, { params }: RouteParams) => {
  const session = await getServerSession(authOptions);

  // 인증되지 않은 사용자는 403 에러
  if (!session || !session.user) {
    return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id: sampleId } = params;
    const id = Number(sampleId);

    const sample = await prisma.sample.findUnique({
      where: { id },
    });

    if (!sample) {
      return NextResponse.json({ message: 'Todo 항목을 찾을 수 없습니다.' }, { status: 404 });
    }

    if (sample.userId && sample.userId !== session.user.id) {
      return NextResponse.json({ message: '이 Todo 항목을 삭제할 권한이 없습니다.' }, { status: 403 });
    }

    await prisma.user.delete({
      where: { id: sample.userId },
    });

    return NextResponse.json({ message: 'Todo 항목이 삭제되었습니다.' });
  } catch (error) {
    console.error('Todo 삭제 에러:', error);
    return NextResponse.json({ message: 'Todo 항목 삭제에 실패했습니다.' }, { status: 500 });
  }
};
