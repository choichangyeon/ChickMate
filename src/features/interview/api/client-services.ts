import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { INTERVIEW_HISTORY_STATUS } from '@/constants/interview-constants';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import type { ResumeType } from '@/types/DTO/resume-dto';
import type { UserType } from '@/types/DTO/user-dto';

const {
  AI: { TTS, STT, ROOT, INTERVIEW_START, INTERVIEW_LIVE, FEEDBACK },
  INTERVIEW_HISTORY: { DETAIL },
} = ROUTE_HANDLER_PATH;
const { POST, PATCH, DELETE, GET } = API_METHOD;
const { JSON_HEADER } = API_HEADER;
const { IN_PROGRESS } = INTERVIEW_HISTORY_STATUS;

/**
 * Open AI TTS(Text to Speech) 통신
 * @param {String} aiQuestion AI가 제공한 질문
 * @param {String} interviewType 인터뷰 타입(calm / pressure)
 * @returns
 */

type TtsProps = {
  aiQuestion: string;
  interviewType: InterviewHistoryType['interviewType'];
};

export const postTextToSpeech = async ({ aiQuestion, interviewType }: TtsProps): Promise<string> => {
  const { response: audioUrl } = await fetchWithSentry(TTS, {
    method: POST,
    headers: JSON_HEADER,
    body: JSON.stringify({
      aiQuestion,
      interviewType,
    }),
  });

  return audioUrl;
};

/**
 * Open AI STT(Speech to Text) 통신
 * @param blob 사용자 목소리 파일
 * @returns transcribedText 변환된 텍스트
 */
type SttProps = {
  blob: Blob;
  interviewId: InterviewHistoryType['id'];
};

export const postSpeechToText = async ({ blob, interviewId }: SttProps): Promise<string> => {
  const formData = new FormData();

  const file = new File([blob], 'recording.webm', { type: `audio/webm` });
  formData.append('file', file);
  formData.append('interviewHistoryId', String(interviewId));

  const { response: transcribedText } = await fetchWithSentry(STT, {
    method: POST,
    body: formData,
  });

  return transcribedText;
};

/**
 * Open AI API 통신
 * @param {String} userAnswer  사용자 답변
 * @param {Number} interviewId 인텨뷰 히스토리 ID
 * @param {String} interviewType 인터뷰 타입(calm / pressure)
 * @returns
 */

type OpenAIProps = {
  userAnswer: string;
  interviewId: InterviewHistoryType['id'];
  interviewType: InterviewHistoryType['interviewType'];
};

export const postOpenAIQuestion = async ({ userAnswer, interviewId, interviewType }: OpenAIProps): Promise<string> => {
  const { response: question } = await fetchWithSentry(ROOT, {
    method: POST,
    headers: JSON_HEADER,
    body: JSON.stringify({ userAnswer, interviewId, interviewType }),
  });

  return question;
};

export const postAIInterviewFeedback = async ({ interviewId }: Pick<OpenAIProps, 'interviewId'>): Promise<void> => {
  await fetchWithSentry(FEEDBACK, {
    method: POST,
    headers: JSON_HEADER,
    body: JSON.stringify({ interviewId }),
  });
};

/**
 * DB에 인터뷰 기록 등록하는 요청
 * @param resumeId 자소서 ID
 * @param interviewType 인터뷰 타입(calm / pressure)
 * @returns id 인터뷰 ID
 */
type InterviewProps = {
  resumeId: ResumeType['id'];
  interviewType: InterviewHistoryType['interviewType'];
};

export const postInterview = async ({ resumeId, interviewType }: InterviewProps): Promise<number> => {
  const { response } = await fetchWithSentry(INTERVIEW_START(resumeId), {
    method: POST,
    headers: JSON_HEADER,
    body: JSON.stringify({
      resumeId,
      interviewType,
    }),
  });

  const { id } = response;

  return id;
};

/** DB에 인터뷰 기록 업데이트하는 요청
 * @param interviewId 인터뷰 기록 ID
 * @param status 업데이트하고자하는 상태
 */
type InterviewHistoryProps = {
  interviewId: InterviewHistoryType['id'];
  status: InterviewHistoryType['status'];
};

export const patchInterviewHistoryStatus = async ({ interviewId, status }: InterviewHistoryProps) => {
  await fetchWithSentry(INTERVIEW_LIVE(interviewId), {
    method: PATCH,
    body: JSON.stringify({
      status,
    }),
    headers: JSON_HEADER,
  });
};

/**
 * @param interviewId 인터뷰 기록 ID
 * @param options 데이터 삭제 옵션
 */

type InterviewDeleteProps = {
  interviewId: InterviewHistoryType['id'];
  status: InterviewHistoryType['status'];
  options: string;
};

export const deleteInterviewHistory = async ({ interviewId, options, status }: InterviewDeleteProps) => {
  const queryParams = new URLSearchParams({
    options,
    status: String(status),
  });

  const url = `${INTERVIEW_START(interviewId)}?${queryParams}`;
  const { message, count } = await fetchWithSentry(url, {
    method: DELETE,
    headers: JSON_HEADER,
  });
  console.log(count);
};

/**
 * @param userId 사용자 ID
 * @returns InProgress 상태의 인터뷰 히스토리
 */
type InterviewInProgressProps = {
  userId: UserType['id'];
};
export const getInterviewHistoryAboutInProgress = async ({ userId }: InterviewInProgressProps) => {
  const queryParams = new URLSearchParams({
    status: String(IN_PROGRESS),
  });
  const url = `${DETAIL(userId)}?${queryParams}`;
  const { data } = await fetchWithSentry(url, {
    method: GET,
    headers: JSON_HEADER,
  });
  if (!data) return null;
  return data;
};
