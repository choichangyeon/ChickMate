import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';

const {
  USER: { META_DATA },
  REGIONS,
} = ROUTE_HANDLER_PATH;

export const getUserMetaData = async (userId: string) => {
  const res = await fetch(`${META_DATA}/${userId}`);
  console.log('res=>', res);
};

export const getRegions = async () => {
  const res = await fetch(REGIONS);
  const regions = await res.json();
  console.log('region=>', regions);
  return regions;
};
