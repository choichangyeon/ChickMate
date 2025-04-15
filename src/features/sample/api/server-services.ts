'use server';

import { prisma } from '@/lib/prisma';

export const getSample = async () => {
  try {
    const data = await prisma.sample.findMany();
    return data;
  } catch (error) {
    throw error;
  }
};
