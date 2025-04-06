import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const ERROR_MESSAGE = {
  AI_REQUEST_FAILURE: 'AI 요청 실패',
  AI_SERVER_ERROR: 'AI 서버 에러',
};

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const DEFAULT_COMPLETION_OPTIONS = {
  model: 'gpt-4o-mini',
  temperature: 1,
  max_completion_tokens: 200,
  top_p: 1,
  store: false,
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { messageList } = await req.json();
  const { AI_REQUEST_FAILURE, AI_SERVER_ERROR } = ERROR_MESSAGE;

  try {
    const res = await openai.chat.completions.create({
      ...DEFAULT_COMPLETION_OPTIONS,
      messages: messageList,
    });

    if (!res) {
      return NextResponse.json({ message: AI_REQUEST_FAILURE }, { status: 400 });
    }

    const text = res.choices[0].message.content;

    return NextResponse.json({ text }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: AI_SERVER_ERROR }, { status: 503 });
  }
};
