import { ENV } from '@/constants/env-constants';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openAi = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * POST 요청 함수
 */
export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const model = formData.get('model') as string;
    const language = formData.get('language') as string;

    console.log(file);
    if (!file) {
      return NextResponse.json({ message: '파일이 제공되지 않았습니다.', status: 400 });
    }

    const { text } = await openAi.audio.transcriptions.create({
      file,
      model,
      language,
    });

    return NextResponse.json({ status: 200, text });
  } catch (error) {
    const error_message = (error as Error).message;
    return NextResponse.json({ message: error_message, status: 503 });
  }
};
