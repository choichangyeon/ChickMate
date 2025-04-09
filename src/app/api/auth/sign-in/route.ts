import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    console.log('user', user);
    return new Response(JSON.stringify(userWithoutPass));
  } else return new Response(JSON.stringify(null));
};
