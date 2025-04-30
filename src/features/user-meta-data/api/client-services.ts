import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import type { UserType } from '@/types/DTO/user-dto';
import type { UserMetaDataType } from '@/types/user-meta-data-type';

const {
  USER: { META_DATA },
} = ROUTE_HANDLER_PATH;
const { POST } = API_METHOD;
const { JSON_HEADER } = API_HEADER;

/**
 * user의 meta data를 받아오는 함수
 * @param userId - 현재 로그인 중인 사용자의 id
 * @returns user의 metadata
 */
export const getUserMetaData = async (userId: UserType['id']): Promise<UserMetaDataType> => {
  const { data } = await fetchWithSentry(`${META_DATA}/${userId}`);
  return data;
};

/**
 * user의 metadata를 DB에 저장하는 함수
 * @param userId - 현재 로그인 중인 user의 id
 * @param metaData - DB에 저장할 user의 meta data
 */
export const postUserMetaData = async (userId: UserType['id'], metaData: UserMetaDataType): Promise<void> => {
  if (metaData.etc === '' || metaData.etc === null) delete metaData.etc;
  await fetchWithSentry(`${META_DATA}/${userId}`, {
    method: POST,
    headers: JSON_HEADER,
    body: JSON.stringify(metaData),
  });
};
