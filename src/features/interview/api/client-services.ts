import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { INTERVIEW_TYPE } from '@/constants/interview-constants';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';

const { TTS, STT } = ROUTE_HANDLER_PATH.AI;
const { POST } = API_METHOD;

const TTS_DEFAULT_OPTIONS = {
  MODEL: 'gpt-4o-mini-tts',
  FORMAT: 'mp3',
};

const STT_DEFAULT_OPTIONS = {
  MODEL: 'gpt-4o-transcribe',
  FORMAT: 'webm',
  LANGUAGE: 'ko',
};

const CALM_OPTIONS = {
  VOICE: 'ash',
  SPEED: 1,
  INSTRUCTION: `Uses a friendly and gentle tone of voice.
  Rather than challenging the candidate's answers, frequently provides emotional empathy or positive reactions.`,
};

const PRESSURE_OPTIONS = {
  VOICE: 'sage',
  SPEED: 2.5,
  INSTRUCTION: `Uses a firm and dry tone of voice.
Avoids showing emotional empathy or positive reactions to the candidate's responses.`,
};

/**
 * @function textToSpeech
 * @param text - 서버로부터 받아온 텍스트 입력
 * @param model - 고정된 TTS 모델 ('gpt-4o-mini-tts')
 * @param voice - default = calm('ash'), pressure('sage')
 * @param speed - default = calm(1), pressure(2.5)
 * @param response_format  - format 형식 default = 'mp3'
 * @param instruction  - 목소리 형식 default = calm
 * @returns {void}
 */

type TTS_Props = {
  text: string;
  type: string;
};

export const textToSpeech = async ({ text, type }: TTS_Props): Promise<void> => {
  const { MODEL, FORMAT } = TTS_DEFAULT_OPTIONS;
  const { PRESSURE } = INTERVIEW_TYPE;
  const { VOICE, SPEED, INSTRUCTION } = type === PRESSURE ? PRESSURE_OPTIONS : CALM_OPTIONS;

  const res = await fetchWithSentry(TTS, {
    method: POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      model: MODEL,
      response_format: FORMAT,
      voice: VOICE,
      speed: SPEED,
      instruction: INSTRUCTION,
    }),
  });

  const data = await res.json();

  const audio = new Audio(data.audioUrl);
  await audio.play();
};

/**
 * @function speechToText
 * @param blob - 사용자 목소리 파일
 * @param model - default('whisper-1')
 * @param format - default('webm')
 * @param language - default('ko')
 * @returns {text}
 */

type STT_Props = {
  blob: Blob;
};

export const speechToText = async ({ blob }: STT_Props): Promise<string> => {
  const { MODEL, FORMAT, LANGUAGE } = STT_DEFAULT_OPTIONS;

  const formData = new FormData();

  const file = new File([blob], 'recording.webm', { type: `audio/${FORMAT}` });
  formData.append('file', file);
  formData.append('model', MODEL);
  formData.append('language', LANGUAGE);
  formData.append('format', FORMAT);

  const res = await fetchWithSentry(STT, {
    method: POST,
    body: formData,
  });

  const data = await res.json();

  return data.text;
};
