import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { PATH, QUERY_PARAMS } from '@/constants/path-constant';

const {
  AUTH: { SIGN_IN, SIGN_UP },
  MY_PAGE,
  INTERVIEW,
  ON_BOARDING,
} = PATH;

const { UNAUTH } = QUERY_PARAMS;

export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;

  // 로그인하지 않은 사용자가 접근하지 못하게 막는 URL
  const protectedPaths = [INTERVIEW.LIVE_ROOT, MY_PAGE];
  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    const signInUrl = new URL(SIGN_IN, request.url);
    signInUrl.searchParams.set(UNAUTH, 'true');
    signInUrl.searchParams.set('prevUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 로그인한 사용자가 접근하지 못하게 막는 URL
  const authPaths = [SIGN_IN, SIGN_UP];
  if (token && authPaths.some((authPath) => pathname.startsWith(authPath))) {
    return NextResponse.redirect(new URL(ON_BOARDING, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/auth/sign-in', '/auth/sign-up', '/interview/live/:path*', '/my-page'],
};
