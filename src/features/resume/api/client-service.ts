import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import type { ResumeData } from '@/types/resume';

type Props = {
  data: ResumeData;
};

type AutoSaveProps = Props & {
  resumeId: number;
};

const { SUBMIT, DRAFT, DETAIL } = ROUTE_HANDLER_PATH.RESUME;
const { POST, PATCH } = API_METHOD;

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

/**
 * DB에 자소서 임시 저장 요청
 * @param {Object} data 수정된 자소서 제목, 자소서 질문/답변
 * @returns {Number} resumeID 자소서 ID
 */
export const autoSaveResume = async ({ resumeId, data }: AutoSaveProps): Promise<number> => {
  const isNewResume = resumeId === null;

  const url = isNewResume ? DRAFT : DETAIL(resumeId);
  const method = isNewResume ? POST : PATCH;

  const savedResume = await fetchWithSentry(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return isNewResume ? savedResume.id : resumeId;
};
