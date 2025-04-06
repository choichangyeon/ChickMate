import { ENV } from '@/constants/env-constants';
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

const ERROR_MESSAGE = {
  NOT_FILE: '파일이 제공되지 않았습니다.',
};

/**
 * POST 요청 함수
 */
export const POST = async (req: NextRequest) => {
  const { FILE, MODEL, LANGUAGE } = FORMAT_FORMDATA;
  const { NOT_FILE } = ERROR_MESSAGE;
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
    const error_message = (error as Error).message;
    return NextResponse.json({ message: error_message }, { status: 503 });
  }
};
