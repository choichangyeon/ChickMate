import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';

const { POSTING } = ROUTE_HANDLER_PATH.JOB;
const { GET } = API_METHOD;

export const getJobByUserMetaData = async (userData) => {
  const { educationLevel, location, employmentType, jobType } = userData;
  const res = await fetchWithSentry(POSTING, {
    method: GET,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      educationLevel,
      location,
      employmentType,
      jobType,
    }),
  });
  console.log(res);
};
