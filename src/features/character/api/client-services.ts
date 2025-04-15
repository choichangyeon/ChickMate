import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { Character, CharacterHistory } from '@prisma/client';

const { INFO, EXPERIENCE, HISTORY } = ROUTE_HANDLER_PATH.CHARACTER;
const { GET, POST, PATCH } = API_METHOD;
const { JSON_HEADER } = API_HEADER;

/**
 * 현재 로그인된 사용자의 캐릭터 정보를 가져옵니다.
 * @async
 * @function getCharacterByUserId
 * @returns {Promise<Character>} 캐릭터 정보와 관련된 히스토리가 담긴 Promise 객체
 * @throws {Error}
 */
export const getCharacterByUserId = async (): Promise<Character> => {
  const { response } = await fetchWithSentry(INFO, {
    method: GET,
    headers: JSON_HEADER,
  });

  return response;
};

type CreateCharacterProps = Pick<Character, 'type'>;

/**
 * 새로운 캐릭터를 생성합니다.
 * @async
 * @function postCreateCharacter
 * @param {Props} type - 생성할 캐릭터의 타입
 * @returns {Promise<Character>} 생성된 캐릭터 정보를 담은 Promise 객체
 * @throws {Error}
 */
export const postCreateCharacter = async ({ type }: CreateCharacterProps): Promise<Character> => {
  const { response } = await fetchWithSentry(INFO, {
    method: POST,
    headers: JSON_HEADER,
    body: JSON.stringify({ type }),
  });

  return response;
};

export type PatchCharacterProps = {
  characterId: Character['id'];
  amount: Character['experience'];
  history: CharacterHistory['history'];
};

/**
 * 캐릭터의 경험치를 증가시킵니다.
 * @async
 * @function patchCharacterExperience
 * @param {object} props - 캐릭터 ID, 획득한 경험치, 히스토리 메시지를 포함한 객체
 * @param {number} props.characterId - 경험치를 획득할 캐릭터의 ID
 * @param {number} props.amount - 증가시킬 경험치 양
 * @param {string} props.history - 경험치 획득 내역(히스토리)
 * @returns {Promise<Character>} 업데이트된 캐릭터 정보를 담은 Promise 객체
 * @throws {Error} 요청 실패 시 에러를 던집니다
 */
export const patchCharacterExperience = async ({
  characterId,
  amount,
  history,
}: PatchCharacterProps): Promise<Character> => {
  const { response } = await fetchWithSentry(EXPERIENCE, {
    method: PATCH,
    headers: JSON_HEADER,
    body: JSON.stringify({ characterId, amount, history }),
  });

  return response;
};

export type GetProps = {
  characterId: Character['id'];
  pageParam: number;
  limit: number;
};

/**
 * 캐릭터의 히스토리를 가져옵니다.
 * @async
 * @function getCharacterHistories
 * @param {object} props - 캐릭터 ID, 페이지 번호, 페이지당 항목 수를 포함한 객체
 * @param {number} props.characterId - 히스토리를 가져올 캐릭터의 ID
 * @param {number} props.pageParam - 가져올 페이지 번호
 * @param {number} props.limit - 한 페이지에 표시할 항목 수
 * @returns {Promise<{histories: CharacterHistory[], nextPage: number | null}>} - 캐릭터 히스토리 목록과 다음 페이지 번호를 담은 Promise 객체
 * @throws {Error} 요청 실패 시 에러를 던집니다
 */
export const getCharacterHistories = async ({
  characterId,
  pageParam,
  limit,
}: GetProps): Promise<{ histories: CharacterHistory[]; nextPage: number | null }> => {
  const queryParams = new URLSearchParams({
    page: String(pageParam),
    limit: String(limit),
  });
  const url = `${HISTORY(characterId)}?${queryParams}`;

  const { response } = await fetchWithSentry(url, {
    method: GET,
    headers: JSON_HEADER,
  });
  return {
    histories: response.histories,
    nextPage: response.nextPage,
  };
};
