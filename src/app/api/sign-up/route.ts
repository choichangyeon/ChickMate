import { AUTH_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

type RequestBody = {
  name: string;
  email: string;
  password: string;
};

const { SIGN_UP_EMPTY_FIELD, SIGN_UP_EXIST_ERROR, SIGN_UP_FAILED } = AUTH_MESSAGE.RESULT;

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ message: SIGN_UP_EMPTY_FIELD }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json({ message: SIGN_UP_EXIST_ERROR }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const { password, ...result } = user;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: SIGN_UP_FAILED }, { status: 500 });
  }
}
