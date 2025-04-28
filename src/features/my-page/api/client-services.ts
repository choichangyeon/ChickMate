import type { User } from '@prisma/client';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';

const {
  USER: { LIST_COUNT },
} = ROUTE_HANDLER_PATH;
const { GET } = API_METHOD;
const { JSON_HEADER } = API_HEADER;

/**
 * 내 면접기록, 내 채용공고, 내 자소서의 개수를 반환
 * @param userId - 현재 로그인 중인 user의 id
 * @returns 내 면접기록 / 내 채용공고 / 내 자소서
 */
export const getTabCount = async (userId: User['id']) => {
  const { response } = await fetchWithSentry(LIST_COUNT(userId), {
    method: GET,
    headers: JSON_HEADER,
  });
  return response;
};
