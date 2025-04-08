import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { Field } from '@/types/resume';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const data = await request.json();
    const { title, fieldList } = data;

    if (!title || !fieldList || !Array.isArray(fieldList)) {
      return NextResponse.json({ error: '유효하지 않은 자소서 형식입니다.' }, { status: 400 });
    }

    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title,
        content: fieldList,
      },
    });

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error('자기소개서 생성 에러:', error);
    return NextResponse.json({ error: '자기소개서 생성에 실패했습니다.' }, { status: 500 });
  }
}
