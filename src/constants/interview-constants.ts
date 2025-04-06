export const INTERVIEW_TYPE = {
  PRESSURE: 'pressure',
  CALM: 'calm',
};

export const INTERVIEW_CONVERT_OPTIONS = {
  TTS_OPTIONS: {
    MODEL: 'gpt-4o-mini-tts',
    FORMAT: 'mp3',
  },
  STT_OPTIONS: {
    MODEL: 'gpt-4o-transcribe',
    FORMAT: 'webm',
    LANGUAGE: 'ko',
  },
};

export const INTERVIEW_VOICE_OPTIONS = {
  CALM_OPTIONS: {
    VOICE: 'ash',
    SPEED: 1,
    INSTRUCTION: `Uses a friendly and gentle tone of voice.
    Rather than challenging the candidate's answers, frequently provides emotional empathy or positive reactions.`,
  },
  PRESSURE_OPTIONS: {
    VOICE: 'sage',
    SPEED: 2.5,
    INSTRUCTION: `Uses a firm and dry tone of voice.
    Avoids showing emotional empathy or positive reactions to the candidate's responses.`,
  },
};
