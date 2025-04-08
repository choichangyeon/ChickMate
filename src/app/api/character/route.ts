import { AUTH_MESSAGE, CHARACTER_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { GET_DATA_FAILED } = CHARACTER_MESSAGE.INFO;

export const GET = async (): Promise<NextResponse> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: AUTH_REQUIRED }, { status: 403 });
  }

  const userId = session.user.id;
  try {
    const response = await prisma.character.findFirst({
      where: { userId },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: GET_DATA_FAILED }, { status: 500 });
  }
};
