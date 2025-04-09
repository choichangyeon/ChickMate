import { NextRequest, NextResponse } from 'next/server';
import { PATH } from './constants/path-constant';

const { ON_BOARDING } = PATH;
export const middleware = (request: NextRequest) => {
  const isOurUser = !!request.cookies.get('next-auth.session-token');
  if (!isOurUser) return NextResponse.redirect(new URL(ON_BOARDING, request.url));
  return NextResponse.next();
};

export const config = {
  matcher: ['/my-page', '/resume/:path*', '/character'],
};
