import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { JobPosting } from '@prisma/client';

const { POSTING, BOOKMARK } = ROUTE_HANDLER_PATH.JOB;
const { POST, DELETE, GET } = API_METHOD;
const EMPTY_LIST_NUMBER = 0;

// TODO : userData 타입 지정하기
export const getJobByUserMetaData = async (userData): Promise<JobPosting[]> => {
  const { educationLevel, location, experienceType, jobType } = userData;

  const queryParams = new URLSearchParams({
    educationLevel,
    location: JSON.stringify(location),
    experienceType,
    jobType,
  });
  const url = `${POSTING}?${queryParams}`;

  const res = await fetchWithSentry(url, {
    method: GET,
    headers: { 'Content-Type': 'application/json' },
  });

  const jobPostingList: JobPosting[] = res.data;

  return jobPostingList;
};

/**
 * @function postBookmarkWithUserId
 * @param jobPostingId - 채용 공고 id(string)
 * @param isBookmarked - 북마크 여부(boolean)
 * @returns {boolean} - 북마킹 여부
 */
type BookmarkProps = {
  jobPostingId: number;
  isMarked: boolean;
};
export const postBookmarkWithJobPostingId = async ({ jobPostingId, isMarked }: BookmarkProps): Promise<boolean> => {
  // 북마킹 여부에 따라 요청 method 달라짐
  if (isMarked) {
    const queryParams = new URLSearchParams({
      jobPostingId: jobPostingId.toString(),
    });
    const url = `${BOOKMARK}?${queryParams}`;
    const res = await fetchWithSentry(url, {
      method: DELETE,
    });

    return res ? false : true;
  } else {
    const res = await fetchWithSentry(BOOKMARK, {
      method: POST,
      body: JSON.stringify({
        jobPostingId,
      }),
    });

    return res ? true : false;
  }
};

/**
 * @function getBookmarkByJobPostingId
 * @param jobPostingId - 채용 공고 id(string)
 * @returns {boolean} - 북마킹 여부
 */
export const getBookmarkByJobPostingId = async (jobPostingId: number): Promise<boolean> => {
  const queryParams = new URLSearchParams({
    jobPostingId: jobPostingId.toString(),
  });
  const url = `${BOOKMARK}?${queryParams}`;
  const { data } = await fetchWithSentry(url, {
    method: GET,
  });

  return data.length !== EMPTY_LIST_NUMBER;
};
