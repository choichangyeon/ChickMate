'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      //회원가입
      const userData = {
        email,
        password: password,
        name: username,
      };
      await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    } else {
      //로그인
      const userData = {
        email,
        password: password,
      };

      const data = await signIn('credentials', userData);
      console.log(data);
    }
  };

  return (
    <div className='mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-6 text-center text-2xl font-bold'>{isSignUp ? '회원가입' : '로그인'}</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {isSignUp && (
          <div>
            <label htmlFor='username' className='mb-1 block text-sm font-medium text-gray-700'>
              사용자 이름
            </label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
        )}
        <div>
          <label htmlFor='email' className='mb-1 block text-sm font-medium text-gray-700'>
            이메일
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='mb-1 block text-sm font-medium text-gray-700'>
            비밀번호
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300'
        >
          {loading ? '처리 중...' : isSignUp ? '가입하기' : '로그인'}
        </button>
      </form>
      <div className='mt-4 text-center'>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className='text-sm font-medium text-blue-600 hover:text-blue-500'
        >
          {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 가입하기'}
        </button>
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
    </div>
  );
};

export default AuthForm;
