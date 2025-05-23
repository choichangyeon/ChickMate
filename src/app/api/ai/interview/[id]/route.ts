import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import type { RouteParams } from '@/types/route-params';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { ENV } from '@/constants/env-constants';
import { AUTH_MESSAGE, DB_MESSAGE, HISTORY_MESSAGE, INTERVIEW_HISTORY } from '@/constants/message-constants';
import { authOptions } from '@/utils/auth-option';

const { NEXTAUTH_SECRET } = ENV;
const { EXPIRED_TOKEN } = AUTH_MESSAGE.ERROR;
const { AUTH_REQUIRED } = AUTH_MESSAGE.RESULT;
const { DB_SERVER_ERROR, DB_REQUEST_ERROR } = DB_MESSAGE.ERROR;
const { USER_ID_VALIDATION } = DB_MESSAGE.VALIDATION;
const { NOT_FOUND, GET_ERROR, PATCH_SERVER_ERROR, FORBIDDEN } = INTERVIEW_HISTORY.API;
const { DELETE_FAIL, DELETE_SUCCESS } = HISTORY_MESSAGE;

/**
 * 원하는 인터뷰 기록 조회 요청
 */
export const GET = async (request: NextRequest, { params }: RouteParams) => {
  try {
    const interviewId = Number(params.id);
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const response = await prisma.interviewHistory.findUnique({
      where: {
        userId: session.user.id,
        id: interviewId,
      },
      include: {
        resume: true,
        InterviewQnAList: true,
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: GET_ERROR }, { status: 500 });
  }
};

/**
 * 면접 기록 등록하는 요청
 * @param request resumeId 자소서 ID
 * @param request interviewType 면접관 타입(calm / pressure)
 * @param resumeId 자소서 아이디
 * @returns
 */
export const POST = async (request: NextRequest, { params }: RouteParams) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const { resumeId, interviewType } = await request.json();

    if (resumeId !== Number(params.id)) {
      return NextResponse.json({ message: DB_REQUEST_ERROR }, { status: 400 });
    }

    if (!session || !userId) return NextResponse.json({ message: USER_ID_VALIDATION }, { status: 401 });

    const response = await prisma.interviewHistory.create({
      data: {
        userId,
        resumeId,
        interviewType,
      },
    });

    // InterviewQnA default 질문 미리 저장
    await prisma.interviewQnA.create({
      data: {
        interviewHistoryId: response.id,
        question: '면접 준비가 완료되었다면, 말하기 버튼을 눌러 자기 소개를 해주세요.',
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DB_SERVER_ERROR }, { status: 500 });
  }
};

/**
 * 인터뷰 기록 status 변경하는 요청
 * @param interviewId 인터뷰 기록 ID
 * @param status 인터뷰 기록 상태
 * @returns interviewHistory 업데이트된 인터뷰 기록
 */
export const PATCH = async (request: NextRequest, { params }: RouteParams) => {
  try {
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const interviewId = Number(params.id);
    const { status } = await request.json();

    const interviewHistory = await prisma.interviewHistory.findUnique({
      where: { id: interviewId },
    });

    if (!interviewHistory) {
      return NextResponse.json({ message: NOT_FOUND }, { status: 404 });
    }

    if (interviewHistory.userId && interviewHistory.userId !== session.user.id) {
      return NextResponse.json({ message: FORBIDDEN }, { status: 403 });
    }

    const response = await prisma.interviewHistory.update({
      where: { id: interviewId },
      data: {
        userId: session.user.id,
        status,
      },
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: PATCH_SERVER_ERROR }, { status: 500 });
  }
};

/**
 * 원하는 인터뷰 기록 삭제 요청
 */
export const DELETE = async (request: NextRequest, { params }: RouteParams) => {
  try {
    const interviewId = Number(params.id);
    const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ message: EXPIRED_TOKEN }, { status: 401 });

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: 401 });
    }

    const existing = await prisma.interviewHistory.findUnique({
      where: {
        userId: session.user.id,
        id: interviewId,
      },
    });

    const searchParams = request.nextUrl.searchParams;
    const { options, status } = sanitizeQueryParams(searchParams);

    if (options === 'ALL') {
      const { count } = await prisma.interviewHistory.deleteMany({
        where: {
          userId: session.user.id,
          status: Number(status),
        },
      });

      return NextResponse.json({ message: DELETE_SUCCESS, count }, { status: 200 });
    }

    if (!existing) {
      return NextResponse.json({ message: NOT_FOUND }, { status: 404 });
    }

    await prisma.interviewHistory.delete({
      where: {
        id: interviewId,
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: DELETE_FAIL }, { status: 500 });
  }
};
