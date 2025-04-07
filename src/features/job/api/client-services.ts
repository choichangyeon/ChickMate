import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';

const { POSTING } = ROUTE_HANDLER_PATH.JOB;
const { GET } = API_METHOD;

export const getJobByUserMetaData = async (userData) => {
  const { educationLevel, location, experienceType, jobType } = userData;

  const queryParams = new URLSearchParams({
    educationLevel,
    location: JSON.stringify(location),
    experienceType,
    jobType,
  });
  const url = `${POSTING}?${queryParams.toString()}`;

  const res = await fetchWithSentry(url, {
    method: GET,
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(res);
};
