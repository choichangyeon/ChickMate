import { AUTH_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

type Request = {
  name: string;
  email: string;
  password: string;
};

const { SIGN_UP_EMPTY_FIELD, SIGN_UP_EXIST_ERROR, SIGN_UP_FAILED } = AUTH_MESSAGE.RESULT;

export async function POST(request: NextRequest) {
  try {
    const { name, email, password }: Request = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: SIGN_UP_EMPTY_FIELD }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: SIGN_UP_EXIST_ERROR }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    const { password: userPassword, ...result } = user;

    return NextResponse.json({ response: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: SIGN_UP_FAILED }, { status: 500 });
  }
}
