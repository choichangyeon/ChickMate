import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import type { User } from '@/types/user';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { MainRegion } from '@prisma/client';
const {
  USER: { META_DATA },
  REGIONS,
} = ROUTE_HANDLER_PATH;
const { POST } = API_METHOD;
const { JSON_HEADER } = API_HEADER;

/**
 * DB에 저장된 지역 데이터를 불러오는 함수
 * @returns 지역리스트
 */
export const getRegions = async (): Promise<MainRegion[]> => {
  const regions = await fetchWithSentry(REGIONS);
  return regions;
};

/**
 * user의 meta data를 받아오는 함수
 * @param userId - 현재 로그인 중인 사용자의 id
 * @returns user의 metadata
 */
export const getUserMetaData = async (userId: User['id']): Promise<UserMetaDataType> => {
  const { data } = await fetchWithSentry(`${META_DATA}/${userId}`);
  return data;
};

/**
 * user의 metadata를 DB에 저장하는 함수
 * @param userId - 현재 로그인 중인 user의 id
 * @param metaData - DB에 저장할 user의 meta data
 */
export const postUserMetaData = async (userId: User['id'], metaData: UserMetaDataType): Promise<void> => {
  if (metaData.etc === '' || metaData.etc === null) delete metaData.etc;
  await fetchWithSentry(`${META_DATA}/${userId}`, {
    method: POST,
    headers: JSON_HEADER,
    body: JSON.stringify(metaData),
  });
};
