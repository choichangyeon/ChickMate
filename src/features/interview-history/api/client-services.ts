import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import type { User } from '@prisma/client';
const {
  USER: { INTERVIEW_HISTORY },
} = ROUTE_HANDLER_PATH;

export const getInterviewHistory = async (userId: User['id']) => {
  const res = await fetchWithSentry(`${INTERVIEW_HISTORY}/${userId}`);
  return res.data;
};
