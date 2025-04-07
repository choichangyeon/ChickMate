// import { prisma } from '@/lib/prisma';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('body=>', body);
  } catch {}
}
