import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import type { InterviewQnAType } from '@/types/DTO/interview-qna-dto';
import type { ResumeType } from '@/types/DTO/resume-dto';
import type { UserType } from '@/types/DTO/user-dto';

const {
  USER: { INTERVIEW_HISTORY, INTERVIEW_DETAIL },
} = ROUTE_HANDLER_PATH;
const { GET, DELETE } = API_METHOD;
const { JSON_HEADER } = API_HEADER;

type Params = {
  userId: UserType['id'];
  pageParam: number;
  limit: number;
};

type Return = {
  id: InterviewHistoryType['id'];
  interviewer: InterviewHistoryType['interviewType'];
  title: ResumeType['title'];
  isFeedbackCompleted: boolean;
  createdAt: string;
};

export const getInterviewHistories = async ({
  userId,
  pageParam,
  limit,
}: Params): Promise<{ histories: Return[]; nextPage: number | null }> => {
  const queryParams = new URLSearchParams({
    page: String(pageParam),
    limit: String(limit),
  });

  const url = `${INTERVIEW_HISTORY}/${userId}?${queryParams}`;

  const response = await fetchWithSentry(url, {
    method: GET,
    headers: JSON_HEADER,
  });

  return {
    histories: response.data,
    nextPage: response.nextPage,
  };
};

type InterviewHistoryDetail = InterviewHistoryType & {
  InterviewQnAList: InterviewQnAType[];
  resume: ResumeType;
};

type InterviewDetailProps = InterviewHistoryType['id'];

export const getInterviewDetail = async (id: InterviewDetailProps): Promise<InterviewHistoryDetail> => {
  const { response: InterviewHistoryDetail } = await fetchWithSentry(INTERVIEW_DETAIL(id), { method: GET });

  return InterviewHistoryDetail;
};

export const deleteInterview = async (id: InterviewDetailProps): Promise<void> => {
  await fetchWithSentry(INTERVIEW_DETAIL(id), {
    method: DELETE,
  });
};
