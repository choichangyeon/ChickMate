import { API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { INTERVIEW_CONVERT_OPTIONS, INTERVIEW_TYPE, INTERVIEW_VOICE_OPTIONS } from '@/constants/interview-constants';
import { fetchWithSentry } from '@/utils/fetch-with-sentry';
import { Message } from '@/types/message';

const { TTS, STT, INTERVIEW } = ROUTE_HANDLER_PATH.AI;
const { CALM_OPTIONS, PRESSURE_OPTIONS } = INTERVIEW_VOICE_OPTIONS;
const { TTS_OPTIONS, STT_OPTIONS } = INTERVIEW_CONVERT_OPTIONS;
const { POST } = API_METHOD;

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

export const postTextToSpeech = async ({ text, type }: TTS_Props): Promise<void> => {
  const { MODEL, FORMAT } = TTS_OPTIONS;
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

  const { audioUrl } = await res.json();

  const audio = new Audio(audioUrl);
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

export const postSpeechToText = async ({ blob }: STT_Props): Promise<string> => {
  const { MODEL, FORMAT, LANGUAGE } = STT_OPTIONS;

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

  const { text } = await res.json();

  return text;
};

/**
 * @function getOpenAIResponse
 * @param messageList - 사용자와 모델간의 대화 리스트
 * @returns {Message[]}
 */

export const getOpenAIResponse = async (messageList: Message[]): Promise<Message[]> => {
  const res = await fetchWithSentry(INTERVIEW, {
    method: POST,
    body: JSON.stringify({ messageList: messageList }),
  });

  const { text } = await res.json();

  messageList.push({
    role: 'assistant',
    content: [
      {
        type: 'text',
        text: text,
      },
    ],
  });

  return messageList;
};
