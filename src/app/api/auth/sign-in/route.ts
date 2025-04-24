import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { AUTH_MESSAGE } from '@/constants/message-constants';

const { SIGN_IN_FAILED } = AUTH_MESSAGE.RESULT;

type Request = {
  email: string;
  password: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const { email, password }: Request = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password!))) {
      const { password, ...userWithoutPassword } = user;

      return new NextResponse(JSON.stringify(userWithoutPassword), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    return NextResponse.json({ message: SIGN_IN_FAILED }, { status: 500 });
  }
};
