'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Header() {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';

  console.log('component: ', session, status);

  return (
    <header className='bg-white shadow-sm'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 justify-between'>
          <div className='flex'>
            <div className='flex flex-shrink-0 items-center'>
              <Link href='/' className='text-2xl font-bold text-blue-600'>
                투두리스트
              </Link>
            </div>
          </div>

          <div className='flex items-center'>
            {isLoading ? (
              <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200'></div>
            ) : session ? (
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || '프로필 이미지'}
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                  ) : (
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white'>
                      {session.user.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className='text-sm font-medium text-gray-700'>{session.user.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className='inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => signIn('google')}
                  className='inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
                >
                  구글 로그인
                </button>
                <button
                  onClick={() => signIn('naver')}
                  className='inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
                >
                  네이버
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
