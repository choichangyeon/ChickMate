import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';

const {
  USER: { META_DATA },
  REGIONS,
} = ROUTE_HANDLER_PATH;
const { POST } = API_METHOD;

export const getUserMetaData = async (userId: string) => {
  const res = await fetch(`${META_DATA}/${userId}`);
  console.log('res=>', res);
};

export const getRegions = async () => {
  const res = await fetch(REGIONS);
  const regions = await res.json();
  return regions;
};

export const postUserMetaData = async (userId, metaData) => {
  if (metaData.etc === '' || metaData.etc === null) delete metaData.etc;
  await fetch(`${META_DATA}/${userId}`, {
    method: POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metaData),
  });
};
