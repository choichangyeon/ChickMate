import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

type RequestBody = {
  name: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: '모든 값을 입력해주세요.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json({ error: '이미 존재하는 이메일입니다.' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const { password, ...result } = user;
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return NextResponse.json({ error: '회원가입에 실패했습니다.' }, { status: 500 });
  }
}
