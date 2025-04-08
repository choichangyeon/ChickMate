import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import type { Field } from '@/types/resume';

type Props = {
  data: { title: string; fieldList: Field[] };
};

const { SUBMIT } = ROUTE_HANDLER_PATH.RESUME;
const { POST } = API_METHOD;

/**
 * DB에 자소서 등록 요청
 * @param {Object} data 자소서 제목, 자소서 질문/답변
 * @param {String} data.title 자소서 제목
 * @param {Array} data.fieldList 자소서 질문/답변
 */
export const postResume = async ({ data }: Props): Promise<void> => {
  await fetchWithSentry(SUBMIT, {
    method: POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
