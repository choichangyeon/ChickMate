import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

type RequestBody = {
  email: string;
  password: string;
};

export const POST = async (request: NextRequest) => {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password!))) {
    const { password, ...userWithoutPass } = user;

    return new NextResponse(JSON.stringify(userWithoutPass));
  } else return new NextResponse(JSON.stringify(null));
};
