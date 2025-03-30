import NextAuth from 'next-auth';
import { authOptions } from '@/utils/auth-option';

// NextAuth 핸들러를 생성합니다. 이 핸들러는 인증 요청을 처리합니다.
const handler = NextAuth(authOptions);

// GET 및 POST 요청에 대해 동일한 핸들러를 사용하도록 설정합니다.
// NextAuth는 로그인/로그아웃 등 인증 관련 작업을 처리하기 위해 GET과 POST 요청을 모두 처리해야 해요.
// GET 요청: 로그인 페이지 로드, 세션 정보 확인, 콜백 처리 등
// POST 요청: 로그인 인증, 로그아웃 처리 등

// GET /api/auth/signin: 로그인 화면 불러오기
// POST /api/auth/signin: 실제 로그인 처리
// GET /api/auth/session: 현재 세션 정보 확인
// POST /api/auth/signout: 로그아웃 처리
// GET /api/auth/callback/google: Google OAuth 콜백 처리

// 이 모든 요청은 동일한 NextAuth 핸들러에 의해 처리되며, NextAuth는 내부적으로 URL 경로와 HTTP 메서드를 확인하여 적절한 작업을 수행합니다.
export { handler as GET, handler as POST };
