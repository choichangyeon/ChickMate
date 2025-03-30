import { NextRequest, NextResponse } from 'next/server';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// 외부 api
/**
 * GET 요청 함수
 *
 */
export const GET = async () => {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'bearer token',
      },
    });
    const { data, error } = await res.json();

    if (res.status !== 200) {
      // return NextResponse.json({ message: error.message, status: res.status });
      throw new Error(JSON.stringify({ message: error.message, status: res.status }));
    }

    return NextResponse.json({ status: 200, data });
  } catch (e) {
    return NextResponse.json({ message: e, status: 503 });
  }
};

/**
 * POST 요청 함수
 */
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'bearer token',
      },
      body: JSON.stringify(body),
    });
    const { data, error } = await res.json();

    if (res.status !== 200) {
      return NextResponse.json({ message: error.message, status: res.status });
    }

    return NextResponse.json({ status: 200, data });
  } catch (e) {
    return NextResponse.json({ message: e, status: 503 });
  }
};

/**
 * DELETE 요청 함수
 */
export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'bearer token',
      },
      body: JSON.stringify(body),
    });
    const { data, error } = await res.json();

    if (res.status !== 200) {
      return NextResponse.json({ message: error.message, status: res.status });
    }

    return NextResponse.json({ status: 200, data });
  } catch (e) {
    return NextResponse.json({ message: e, status: 503 });
  }
};

/**
 * PATCH 요청 함수
 */
export const PATCH = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'bearer token',
      },
      body: JSON.stringify(body),
    });
    const { data, error } = await res.json();

    if (res.status !== 200) {
      return NextResponse.json({ message: error.message, status: res.status });
    }

    return NextResponse.json({ status: 200, data: data });
  } catch (e) {
    return NextResponse.json({ message: e, status: 503 });
  }
};

/**
 * PUT 요청 함수
 */
export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'bearer token',
      },
      body: JSON.stringify(body),
    });
    const { data, error } = await res.json();

    if (res.status !== 200) {
      return NextResponse.json({ message: error.message, status: res.status });
    }

    return NextResponse.json({ status: 200, data });
  } catch (e) {
    return NextResponse.json({ message: e, status: 503 });
  }
};
