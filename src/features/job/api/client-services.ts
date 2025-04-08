import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { JobPosting } from '@prisma/client';

const { POSTING } = ROUTE_HANDLER_PATH.JOB;
const { GET } = API_METHOD;

// TODO : userData 타입 지정하기
export const getJobByUserMetaData = async (userData): Promise<JobPosting[]> => {
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

  const jobPostingList: JobPosting[] = res.data;

  return jobPostingList;
};
