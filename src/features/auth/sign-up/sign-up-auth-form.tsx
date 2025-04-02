'use client';

import { PATH } from '@/constants/path-constant';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { postSignUp } from './api/client-services';

const SignUpAuthForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const sign_up_data = {
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      name: String(formData.get('name')),
    };
    try {
      await postSignUp(sign_up_data);
      router.push(PATH.AUTH.SIGN_IN);
      alert('회원 가입에 성공하셨습니다.');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-6 text-center text-2xl font-bold'>회원가입</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username' className='mb-1 block text-sm font-medium text-gray-700'>
            사용자 이름
          </label>
          <input
            id='name'
            name='name'
            type='text'
            className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <div>
          <label htmlFor='email' className='mb-1 block text-sm font-medium text-gray-700'>
            이메일
          </label>
          <input
            id='email'
            name='email'
            type='email'
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
            name='password'
            type='password'
            className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300'
        >
          가입하기
        </button>
        <button className='w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300'>
          <Link href={PATH.AUTH.CHARACTER}>캐릭터 생성하러 가기</Link>
        </button>
      </form>
      <div className='mt-4 flex flex-col gap-2 text-center'>
        <Link href={PATH.AUTH.SIGN_IN}>이미 계정이 있으신가요?</Link>
      </div>
    </div>
  );
};

export default SignUpAuthForm;
