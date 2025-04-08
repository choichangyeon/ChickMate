import { API_METHOD } from '@/constants/api-method-constants';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';

const { POST } = API_METHOD;

/**
 * @function postBookmarkWithUserId
 * @param jobPostingId - 채용 공고 id(string)
 * @returns {boolean} - 북마킹 여부
 */
export const postBookmarkWithUserId = async (jobPostingId: number): Promise<boolean> => {
  const res = await fetchWithSentry('/api/job/bookmark', {
    method: POST,
    body: JSON.stringify({
      jobPostingId,
    }),
  });

  return res ? true : false;
};
