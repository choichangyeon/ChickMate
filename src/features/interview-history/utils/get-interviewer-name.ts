import { INTERVIEW_TYPE, INTERVIEW_TYPE_KR } from '@/constants/interview-constants';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
const { CALM } = INTERVIEW_TYPE;
const { CALM_KR, PRESSURE_KR } = INTERVIEW_TYPE_KR;
export const getInterviewerName = (type: InterviewHistoryType['interviewType']) => {
  return type === CALM ? `${CALM_KR} ☀️` : `${PRESSURE_KR} 🔥`;
};
