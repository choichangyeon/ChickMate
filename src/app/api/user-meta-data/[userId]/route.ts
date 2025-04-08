import { USER_META_DATA_FORM_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type Props = {
  params: {
    userId: string;
  };
};

const {
  API: { POST_DATA_ERROR, GET_DATA_ERROR },
} = USER_META_DATA_FORM_MESSAGE;

export async function GET(request: Request, { params }: Props) {
  try {
    const { userId } = params;
    const { userMetaData } = await prisma.user.findUnique({
      where: { id: userId },
    });
    return NextResponse.json({ data: userMetaData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: GET_DATA_ERROR }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: Props) {
  try {
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
    console.error(error);
    return NextResponse.json(
      {
        message: POST_DATA_ERROR,
      },
      {
        status: 500,
      }
    );
  }
}
