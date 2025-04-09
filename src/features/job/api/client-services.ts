import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { JobPosting } from '@prisma/client';

const { POSTING, BOOKMARK_DETAIL } = ROUTE_HANDLER_PATH.JOB;
const { POST, DELETE, GET } = API_METHOD;
const EMPTY_LIST_NUMBER = 0;

// TODO : userData 타입 지정하기
type UserDataProps = {
  educationLevel: string;
  location: Record<string, string>;
  experienceType: string;
  jobType: string;
};
export const getJobByUserMetaData = async (userData: UserDataProps): Promise<JobPosting[]> => {
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
type BookmarkPostProps = {
  jobPostingId: number;
  isBookmarked: boolean;
};
export const postBookmarkWithJobPostingId = async ({
  jobPostingId,
  isBookmarked,
}: BookmarkPostProps): Promise<boolean> => {
  // 북마킹 여부에 따라 요청 method 달라짐
  const method = isBookmarked ? DELETE : POST;
  const url = BOOKMARK_DETAIL(jobPostingId);
  const res = await fetchWithSentry(url, {
    method,
  });

  return res ? !isBookmarked : isBookmarked;
};

/**
 * @function getBookmarkByJobPostingId
 * @param jobPostingId - 채용 공고 id(string)
 * @returns {boolean} - 북마킹 여부
 */
type BookmarkDeleteProps = {
  jobPostingId: number;
};
export const getBookmarkByJobPostingId = async ({ jobPostingId }: BookmarkDeleteProps): Promise<boolean> => {
  const url = BOOKMARK_DETAIL(jobPostingId);
  const { data } = await fetchWithSentry(url, {
    method: GET,
  });

  return data.length !== EMPTY_LIST_NUMBER;
};
