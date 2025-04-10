import { AUTH_MESSAGE, USER_META_DATA_FORM_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: {
    userId: string;
  };
};

const {
  API: { POST_DATA_ERROR },
} = USER_META_DATA_FORM_MESSAGE;

const {
  ERROR: { EXPIRED_TOKEN },
} = AUTH_MESSAGE;

export const POST = async (request: NextRequest, { params }: Props) => {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });
    const { userId } = params;
    const payload = await request.json();
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userMetaData: payload,
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: POST_DATA_ERROR,
      },
      {
        status: 500,
      }
    );
  }
};
