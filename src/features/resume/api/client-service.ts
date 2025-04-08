import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import type { Field } from '@/types/resume';

type Props = {
  data: { title: string; fieldList: Field[] };
};

const { RESUME } = ROUTE_HANDLER_PATH;
const { POST } = API_METHOD;

export const postResumeField = async ({ data }: Props): Promise<void> => {
  await fetchWithSentry(RESUME, {
    method: POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
