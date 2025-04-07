// import { prisma } from '@/lib/prisma';

import { USER_META_DATA_FORM_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// type Props = {
//   params: {
//     userId: string;
//   };
// };
// export async function GET(request: Request, { params }: Props) {
//   const { userId } = params;
//   const { user_meta_data } = await prisma.user.findUnique({
//     where: { id: userId },
//   });
//   console.log('여기는찍히니', user_meta_data);
// }

type Props = {
  params: {
    userId: string;
  };
};
const {
  API: { POST_DATA_ERROR },
} = USER_META_DATA_FORM_MESSAGE;
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
