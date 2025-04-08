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
export const POST = async (request: NextRequest): Promise<NextResponse> => {
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
      const error_message = await res.text();
      console.error(error_message);
      return NextResponse.json({ message: REQUEST_FAILURE }, { status: res.status });
    }

    const arrayBuffer = await res.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');
    const audioUrl = `data:audio/${response_format};base64,${base64Audio}`;

    return NextResponse.json({ audioUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 503 });
  }
};
