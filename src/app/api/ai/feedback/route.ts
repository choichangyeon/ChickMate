import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { openAi } from '@/lib/open-ai';
import { prisma } from '@/lib/prisma';
import { ENV } from '@/constants/env-constants';
import { AI_MESSAGE, AUTH_MESSAGE, INTERVIEW_HISTORY } from '@/constants/message-constants';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';

const { NEXTAUTH_SECRET } = ENV;
const { EXPIRED_TOKEN } = AUTH_MESSAGE.ERROR;
const { AI_REQUEST_FAILURE, AI_SERVER_ERROR } = AI_MESSAGE.AI;
const { NOT_FOUND } = INTERVIEW_HISTORY.API;

const DEFAULT_COMPLETION_OPTIONS = {
  model: 'gpt-4o-mini',
  temperature: 1,
  max_completion_tokens: 2024,
  top_p: 1,
  store: false,
};

const SYSTEM_FEEDBACK_PROMPT = `You are an AI interview evaluator who reviews a user’s interview responses and provides feedback based on the evaluation criteria below.\nEvaluate the user's answer based strictly on the following five competencies. Write exactly one sentence for each of the two subcategories: \"strength\" and \"improvement\".\n\nWhen describing areas for improvement, focus on constructive suggestions rather than negative criticism.\nIf a particular competency is not evident or not covered in the response, write “답변에서 확인 어려움”.\n\n[Evaluation Criteria]\n1. Communication Skills: The ability to clearly convey one’s thoughts and understand others effectively\n2. Problem-Solving Ability: The ability to identify problems and find effective solutions\n3. Proactiveness: The attitude of identifying issues independently and taking initiative\n4. Growth Potential: The ability to learn new things quickly and adapt flexibly to change\n5. Interest in the Role: The reason for choosing the role and relevant experience\n\n[Feedback Output Format]\nPlease provide the feedback in the following Array format. Each item should be a single object where the competency name is the key, and it contains two inner keys: \"strength\" and \"improvement\".\nYou must use exactly the following five competency names as keys:\n\"communication\", \"problemSolving\", \"proactivity\", \"growthPotential\", \"interestInTheRole\"\nAll feedback content must be written in Korean.\nDon’t wrap it in a code block.\n\nExample:\n[\n  {\n    \"communication\": {\n      \"strength\": \"Your feedback here\",\n      \"improvement\": \"Your feedback here\"\n    }\n  },\n  {\n    \"problemSolving\": {\n      \"strength\": \"Your feedback here\",\n      \"improvement\": \"Your feedback here\"\n    }\n  },\n  {\n    \"proactivity\": {\n      \"strength\": \"Your feedback here\",\n      \"improvement\": \"Your feedback here\"\n    }\n  },\n  {\n    \"growthPotential\": {\n      \"strength\": \"Your feedback here\",\n      \"improvement\": \"Your feedback here\"\n    }\n  },\n  {\n    \"interestInTheRole\": {\n      \"strength\": \"Your feedback here\",\n      \"improvement\": \"Your feedback here\"\n    }\n  }\n]`;

type Request = {
  interviewId: number;
};

export const POST = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const { interviewId }: Request = await request.json();

    const interviewHistory = await prisma.interviewHistory.findUnique({
      where: { id: interviewId },
      include: { InterviewQnAList: true },
    });

    if (!interviewHistory) {
      return NextResponse.json({ message: NOT_FOUND }, { status: 404 });
    }

    /** AI 시스템 설정 */
    const systemMessage: ChatCompletionMessageParam = {
      role: 'system',
      content: SYSTEM_FEEDBACK_PROMPT,
    };

    const INTERVIEW_ANSWER = JSON.stringify(interviewHistory.InterviewQnAList);
    const USER_MESSAGE = `다음은 사용자의 면접 답변에 대한 내용입니다: ${INTERVIEW_ANSWER} 면접 질문에 대해 답변을 잘 하고 있는지 평가해주세요.`;

    /** 최종적으로 AI에게 전달할 메시지 */
    const fullMessageList: ChatCompletionMessageParam[] = [systemMessage, { role: 'user', content: USER_MESSAGE }];

    const completion = await openAi.chat.completions.create({
      ...DEFAULT_COMPLETION_OPTIONS,
      messages: fullMessageList,
    });

    if (!completion) {
      return NextResponse.json({ message: AI_REQUEST_FAILURE }, { status: 400 });
    }

    const response = completion.choices[0].message.content;

    if (!response) {
      return NextResponse.json({ message: AI_REQUEST_FAILURE }, { status: 400 });
    }

    await prisma.interviewHistory.update({
      where: { id: interviewId },
      data: {
        feedback: JSON.parse(response),
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: AI_SERVER_ERROR }, { status: 500 });
  }
};
