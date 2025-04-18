import { USER_META_DATA_FORM_MESSAGE } from '@/constants/message-constants';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
const {
  API: { GET_REGIONS_ERROR },
} = USER_META_DATA_FORM_MESSAGE;

export const GET = async () => {
  try {
    const mainRegions = await prisma.mainRegion.findMany();
    const parsedMainRegions = mainRegions.map((region) => ({
      ...region,
      value: region.name,
    }));
    return NextResponse.json(parsedMainRegions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: GET_REGIONS_ERROR }, { status: 500 });
  }
};
