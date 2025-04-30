import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import type { SortOption } from '@/features/job/job-postings-box';
import type { JobPostingType } from '@/types/DTO/job-posting-dto';

const { POSTING, BOOKMARK, BOOKMARK_DETAIL } = ROUTE_HANDLER_PATH.JOB;
const { JSON_HEADER } = API_HEADER;
const { POST, DELETE, GET } = API_METHOD;
const EMPTY_LIST_NUMBER = 0;

export const getJobByUserMetaData = async (
  userMetaData: UserMetaDataType,
  sortOption: SortOption,
  page: number,
  limit: number
): Promise<{ jobPostingList: (JobPostingType & { isBookmarked: boolean })[]; totalCount: number }> => {
  const { requiredEducationName, locationName, experienceName, jobMidCodeName } = userMetaData;
  const queryParams = new URLSearchParams({
    requiredEducationName,
    locationName,
    experienceName,
    jobMidCodeName,
    sortOption,
    page: String(page),
    limit: String(limit),
  });
  const url = `${POSTING}?${queryParams}`;

  const { response, totalCount } = await fetchWithSentry(url, {
    method: GET,
    headers: JSON_HEADER,
  });

  const jobPostingList: (JobPostingType & { isBookmarked: boolean })[] = response;
  return { jobPostingList, totalCount };
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

/**
 * 북마크 채용 공고 등록 횟수 확인 요청 (경험치 제한)
 * @returns {Boolean} isAbleToGetEXP 경험치 획득 가능 여부
 */
export const getCheckToGetEXP = async (): Promise<boolean> => {
  const { response } = await fetchWithSentry(`${BOOKMARK}/count`, {
    method: GET,
  });
  return response.isAbleToGetEXP;
};
