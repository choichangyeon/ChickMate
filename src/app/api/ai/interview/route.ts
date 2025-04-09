import { AI_MESSAGE } from '@/constants/message-constants';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

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

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const { AI_REQUEST_FAILURE, AI_SERVER_ERROR } = AI_MESSAGE.AI;
  try {
    const { messageList } = await request.json();
    const res = await openai.chat.completions.create({
      ...DEFAULT_COMPLETION_OPTIONS,
      messages: messageList,
    });

    if (!res) {
      return NextResponse.json({ message: AI_REQUEST_FAILURE }, { status: 400 });
    }

    const text = res.choices[0].message.content;

    return NextResponse.json({ data: text }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: AI_SERVER_ERROR }, { status: 500 });
  }
};
