import { ENV } from '@/constants/env-constants';
import { AI_MESSAGE } from '@/constants/message-constants';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openAi = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * POST 요청 함수
 */
export const POST = async (request: NextRequest) => {
  const { REQUEST_FAILURE, SERVER_ERROR } = AI_MESSAGE.TTS;
  try {
    const { text, model, voice, speed, response_format, instructions } = await request.json();
    const res = await openAi.audio.speech.create({
      input: text,
      model,
      response_format,
      voice,
      speed,
      instructions,
    });

    if (!res.ok) {
      return NextResponse.json({ message: REQUEST_FAILURE }, { status: 400 });
    }

    const arrayBuffer = await res.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');
    const response = `data:audio/${response_format};base64,${base64Audio}`;

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
