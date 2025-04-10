import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { Character } from '@prisma/client';

const { INFO } = ROUTE_HANDLER_PATH.CHARACTER;
const { GET, POST } = API_METHOD;
const { JSON_HEADER } = API_HEADER;

/**
 * 현재 로그인된 사용자의 캐릭터 정보를 가져옵니다.
 * @async
 * @function getCharacterByUserId
 * @returns {Promise<Character>} 캐릭터 정보가 담긴 Promise 객체
 * @throws {Error}
 */
export const getCharacterByUserId = async (): Promise<Character> => {
  const { response } = await fetchWithSentry(INFO, {
    method: GET,
    headers: JSON_HEADER,
  });

  return response;
};

type Props = string;

/**
 * 새로운 캐릭터를 생성합니다.
 * @async
 * @function postCreateCharacter
 * @param {Props} type - 생성할 캐릭터의 타입
 * @returns {Promise<Character>} 생성된 캐릭터 정보를 담은 Promise 객체
 * @throws {Error}
 */
export const postCreateCharacter = async (type: Props): Promise<Character> => {
  const { response } = await fetchWithSentry(INFO, {
    method: POST,
    headers: JSON_HEADER,
    body: JSON.stringify({ type }),
  });

  return response;
};
