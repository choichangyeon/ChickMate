import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';

import type { NextAuthOptions } from 'next-auth';

// NextAuth 설정 옵션을 정의합니다.
export const authOptions: NextAuthOptions = {
  // PrismaAdapter를 사용하여 Prisma와의 연결을 설정합니다.
  adapter: PrismaAdapter(prisma),
  // 인증 제공자를 설정합니다. 여기서는 Google 인증을 사용합니다.
  providers: [
    GoogleProvider({
      // Google 클라이언트 ID와 비밀 키를 환경 변수에서 가져옵니다.
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  // 인증 과정에서 사용할 콜백 함수를 정의합니다.
  callbacks: {
    // 세션이 생성될 때 호출되는 콜백 함수입니다.
    async session({ session, user }) {
      // 세션 객체에 사용자 ID를 추가합니다.
      if (session.user) {
        session.user.id = user.id;
      }
      // 수정된 세션 객체를 반환합니다.
      return session;
    },
  },
  // 사용자 정의 로그인 페이지 경로를 설정합니다.
  // 원래의 경우라면, 로그인 페이지가 없어서 기본 로그인 페이지로 리디렉션됩니다.
  // 하지만, 우리는 사용자 정의 로그인 페이지를 사용하기 때문에 이 설정을 추가합니다.
  pages: {
    signIn: '/', // 사용자가 로그인하지 않았을 때 리디렉션될 페이지입니다.
  },
};
