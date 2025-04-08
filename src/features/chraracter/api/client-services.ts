import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { Character } from '@prisma/client';

const { INFO } = ROUTE_HANDLER_PATH.CHARACTER;
const { GET } = API_METHOD;
const { JSON_HEADER } = API_HEADER;

export const getCharacterByUserId = async (): Promise<Character> => {
  const { response } = await fetchWithSentry(INFO, {
    method: GET,
    headers: JSON_HEADER,
  });

  return response;
};
