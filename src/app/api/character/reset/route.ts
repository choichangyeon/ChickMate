// reset 테스트용

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { AUTH_MESSAGE } from '@/constants/message-constants';

const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;

export async function PATCH() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: AUTH_REQUIRED }, { status: 403 });
  }

  const { id: userId } = session.user;
  console.log(session.user);

  try {
    const character = await prisma.character.findFirst({
      where: { userId },
    });

    const updated = await prisma.character.update({
      where: { id: character.id },
      data: { experience: 0 },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
