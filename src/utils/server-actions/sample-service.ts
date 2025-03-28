'use server';

import { prisma } from '@/lib/prisma';

const getSample = async () => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'bearer token',
      },
    });
    const { data, error } = await res.json();

    if (res.status !== 200) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const getSamplePrisma = async () => {
  try {
    const data = await prisma.todo.findMany();
    return data;
  } catch (error) {
    throw error;
  }
};
