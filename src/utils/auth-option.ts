import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import CredentialsProvider from 'next-auth/providers/credentials';
import { API_HEADER, API_METHOD } from '@/constants/api-method-constants';
import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';
import { ENV } from '@/constants/env-constants';
import type { NextAuthOptions } from 'next-auth';

const { POST } = API_METHOD;
const { JSON_HEADER } = API_HEADER;
const { SIGN_IN } = ROUTE_HANDLER_PATH.AUTH;
const { BASE_URL } = ENV;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',

      credentials: {
        email: { label: '이메일', type: 'text', placeholder: '이메일 입력' },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials, req) {
        const res = await fetch(`${BASE_URL}/${SIGN_IN}`, {
          method: POST,
          headers: JSON_HEADER,
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (res.ok && user) {
          return { ...user };
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if ((user as any)?.accessToken) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
};
