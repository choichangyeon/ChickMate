import { ENV } from '@/constants/env-constants';
import { AI_MESSAGE } from '@/constants/message-constants';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openAi = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const FORMAT_FORMDATA = {
  FILE: 'file',
  MODEL: 'model',
  LANGUAGE: 'language',
};

/**
 * POST 요청 함수
 */
export const POST = async (req: NextRequest) => {
  const { NOT_FILE, SERVER_ERROR } = AI_MESSAGE.STT;
  const { FILE, MODEL, LANGUAGE } = FORMAT_FORMDATA;
  try {
    const formData = await req.formData();
    const file = formData.get(FILE) as File;
    const model = formData.get(MODEL) as string;
    const language = formData.get(LANGUAGE) as string;

    if (!file) {
      return NextResponse.json({ message: NOT_FILE }, { status: 400 });
    }

    const { text } = await openAi.audio.transcriptions.create({
      file,
      model,
      language,
    });

    return NextResponse.json({ text }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: SERVER_ERROR }, { status: 503 });
  }
};
