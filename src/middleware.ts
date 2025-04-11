import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { PATH, QUERY_PARAMS } from './constants/path-constant';

const {
  AUTH: { SIGN_IN },
} = PATH;

const { UNAUTH } = QUERY_PARAMS;

export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;
  // next-auth에서는 token이 만료되었는지에 대한 정보를 주지 않음
  // 따라서 이 사용자가 토큰이 없는 이유가 로그인을 안 해서인지, 토큰이 만료되어서인지 확인 불가
  // 일단 토큰이 없으면 로그인 페이지로 이동을 하는데,
  // 만약 로그인 후 활동을 하고 있던 사용자라면
  // 서버와 통신을 시도할 때는 token이 없어서 서버에서 401 오류를 반환해 주기 때문에 그걸 기반으로 토큰이 만료되었다는 alert를 띄워주고
  // 사용자가 왜 로그인 페이지로 이동하는지 이유를 알 수 있지만
  // 서버와 통신이 아닌 auth page로 이동을 하려는 사용자는 이유도 모르고 갑자기 로그인 페이지로 이동함
  // 왜냐하면 페이지 이동에서는 alert를 띄울 수 없음 -> 우리도 토큰 만료에 의한 이동인지, 비회원이라 이동인지 알 수 없기 때문!
  // 뾰족한 방법이 없는 관계로 일단 로그인 페이지로 이동시키는 것으로 처리해둠.
  // unauthorized=true를 넣은 이유 : 토큰이 만료된 상태에서 로그인 페이지로 이동
  //  -> '토큰'이 만료되었을 뿐 '세션'은 그대로여서 로그인한 상태로 인식
  // 따라서 queryParams로 토큰 만료되어서 이동한 로그인 페이지임을 알림
  //   NextResponse.redirect(new URL(`${SIGN_IN}?${UNAUTH}=true`, request.url));

  const response = token
    ? NextResponse.next()
    : NextResponse.redirect(new URL(`${SIGN_IN}?${UNAUTH}=true`, request.url));

  response.headers.set('x-pathname', pathname);

  return response;
};

export const config = {
  matcher: ['/my-page', '/resume/:path*', '/character', '/job'],
};
