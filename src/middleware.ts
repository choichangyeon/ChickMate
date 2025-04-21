import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { PATH, QUERY_PARAMS } from './constants/path-constant';

const {
  AUTH: { SIGN_IN },
  MY_PAGE,
  INTERVIEW,
  RESUME,
  JOB,
} = PATH;

const { UNAUTH } = QUERY_PARAMS;

export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;

  if (!token && [MY_PAGE, RESUME.ROOT, JOB, INTERVIEW.START].some((path) => pathname.startsWith(path))) {
    const signInUrl = new URL(SIGN_IN, request.url);
    signInUrl.searchParams.set(UNAUTH, 'true');
    signInUrl.searchParams.set('prevUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/my-page', '/resume/:path*', '/job', '/auth/sign-in', '/interview/start', '/interview/live/:path*'],
};
