import { CHARACTER_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const { PATCH_DATA_FAILED } = CHARACTER_MESSAGE.PATCH;

export async function PATCH(request: NextRequest) {
  try {
    const { characterId, amount } = await request.json();

    const updated = await prisma.character.update({
      where: { id: characterId },
      data: { experience: { increment: amount } },
    });
    return NextResponse.json({ updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: PATCH_DATA_FAILED }, { status: 500 });
  }
}
