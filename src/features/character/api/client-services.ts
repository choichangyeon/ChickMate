import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { Character, CharacterHistory } from '@prisma/client';

const { INFO, EXPERIENCE } = ROUTE_HANDLER_PATH.CHARACTER;
const { GET, POST, PATCH } = API_METHOD;
const { JSON_HEADER } = API_HEADER;

/**
 * 현재 로그인된 사용자의 캐릭터 정보를 가져옵니다.
 * @async
 * @function getCharacterByUserId
 * @returns {Promise<Character & { characterHistories: CharacterHistory[] }>} 캐릭터 정보와 관련된 히스토리가 담긴 Promise 객체
 * @throws {Error}
 */
export const getCharacterByUserId = async (): Promise<Character & { characterHistories: CharacterHistory[] }> => {
  const { response } = await fetchWithSentry(INFO, {
    method: GET,
    headers: JSON_HEADER,
  });

  return response;
};

type CreateProps = Pick<Character, 'type'>;

/**
 * 새로운 캐릭터를 생성합니다.
 * @async
 * @function postCreateCharacter
 * @param {Props} type - 생성할 캐릭터의 타입
 * @returns {Promise<Character>} 생성된 캐릭터 정보를 담은 Promise 객체
 * @throws {Error}
 */
export const postCreateCharacter = async ({ type }: CreateProps): Promise<Character> => {
  const { response } = await fetchWithSentry(INFO, {
    method: POST,
    headers: JSON_HEADER,
    body: JSON.stringify({ type }),
  });

  return response;
};

export type PatchProps = {
  characterId: Character['id'];
  amount: Character['experience'];
  history: CharacterHistory['history'];
};

/**
 * 캐릭터의 경험치를 증가시킵니다.
 * @async
 * @function patchCharacterExperience
 * @param {Object} props - 캐릭터 ID, 획득한 경험치, 히스토리 메시지를 포함한 객체
 * @param {number} props.characterId - 경험치를 획득할 캐릭터의 ID
 * @param {number} props.amount - 증가시킬 경험치 양
 * @param {string} props.history - 경험치 획득 내역(히스토리)
 * @returns {Promise<Character>} 업데이트된 캐릭터 정보를 담은 Promise 객체
 * @throws {Error} 요청 실패 시 에러를 던집니다
 */
export const patchCharacterExperience = async ({ characterId, amount, history }: PatchProps): Promise<Character> => {
  const { response } = await fetchWithSentry(EXPERIENCE, {
    method: PATCH,
    headers: JSON_HEADER,
    body: JSON.stringify({ characterId, amount, history }),
  });

  return response;
};
