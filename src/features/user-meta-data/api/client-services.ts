import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import type { User } from '@/types/user';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import { MainRegion } from '@prisma/client';
const {
  USER: { META_DATA },
  REGIONS,
} = ROUTE_HANDLER_PATH;
const { POST } = API_METHOD;

/**
 * DB에 저장된 지역 데이터를 불러오는 함수
 * @returns 지역리스트
 */
export const getRegions = async (): Promise<MainRegion[]> => {
  const res = await fetch(REGIONS);
  const regions = await res.json();
  return regions;
};

/**
 * user의 metadata를 DB에 저장하는 함수
 * @param userId - 현재 로그인 중인 user의 id
 * @param metaData - DB에 저장할 user의 meta data
 */
export const postUserMetaData = async (userId: User['id'], metaData: UserMetaDataType): Promise<void> => {
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
    throw error;
  }
};
