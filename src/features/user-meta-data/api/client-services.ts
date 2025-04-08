import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';

const {
  USER: { META_DATA },
  REGIONS,
} = ROUTE_HANDLER_PATH;
const { POST } = API_METHOD;

export const getUserMetaData = async (userId: string) => {
  try {
    const res = await fetch(`${META_DATA}/${userId}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
    return result.data;
  } catch (error) {
    alert(error);
  }
};

export const getRegions = async () => {
  const res = await fetch(REGIONS);
  const regions = await res.json();
  return regions;
};

export const postUserMetaData = async (userId, metaData) => {
  try {
    if (metaData.etc === '' || metaData.etc === null) delete metaData.etc;
    const res = await fetch(`${META_DATA}/${userId}`, {
      method: POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metaData),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
  } catch (error) {
    alert(error);
  }
};
