import { API_METHOD } from '@/constants/api-method-constants';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';

const { POST, DELETE, GET } = API_METHOD;
const EMPTY_LIST_NUMBER = 0;

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
    const res = await fetchWithSentry('/api/job/bookmark', {
      method: DELETE,
      body: JSON.stringify({
        jobPostingId,
      }),
    });

    return res ? false : true;
  } else {
    const res = await fetchWithSentry('/api/job/bookmark', {
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
  const url = `/api/job/bookmark?${queryParams.toString()}`;
  const { data } = await fetchWithSentry(url, {
    method: GET,
  });

  if (data.length !== EMPTY_LIST_NUMBER) {
    return true;
  }

  return false;
};
