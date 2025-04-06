'use client';

import { PATH } from '@/constants/path-constant';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthInput from '@/features/auth/auth-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, SignInFormData } from '@/features/auth/sign-in/data/schema';
import Image from 'next/image';
import { AUTH_MESSAGE } from '@/constants/message-constants';

const callback_url = `${process.env.NEXT_PUBLIC_BASE_URL}/${PATH.ON_BOARDING}`;

const { RESULT } = AUTH_MESSAGE;
const { SIGN_IN_SUCCESS, SIGN_IN_FAILED } = RESULT;

const SignInAuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '' } as SignInFormData,
  });
  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (!res.ok) {
        throw new Error(SIGN_IN_FAILED);
      } else {
        alert(SIGN_IN_SUCCESS);
        router.replace(PATH.ON_BOARDING);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
      <p className='mb-1 text-center text-2xl font-light'>
        만나서 반가워요.<span className='font-normal'>병아리</span>씨!
      </p>
      <p className='mb-4 text-center font-extralight'>우리 같이 취업을 향한 여정을 떠나볼까요?</p>
      <p className='mb-10 text-center font-extralight text-black/30'>원할한 서비스 이용을 위해 로그인 해주세요.</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthInput label='EMAIL' id='email' register={register} error={errors.email} type='email' />
        <AuthInput label='PASSWORD' id='password' register={register} error={errors.password} type='password' />
        <button
          type='submit'
          className='bg-blue-white mt-2 w-full rounded-md border border-gray-400 px-4 py-2 text-sm font-medium text-black shadow-sm'
        >
          로그인
        </button>
      </form>
      <div className='mt-2 flex flex-col gap-2 text-center'>
        <>
          <button
            onClick={() => signIn('google', { callbackUrl: callback_url })}
            className='flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm'
          >
            <Image src='/assets/google_icon.png' alt='구글 로그인' width={14} height={14} />
            구글 계정으로 로그인
          </button>
          <button
            onClick={() => signIn('naver', { callbackUrl: callback_url })}
            className='flex w-full items-center justify-center gap-2 rounded-md bg-[#03C75A] px-4 py-2 text-sm font-bold text-white shadow-sm'
          >
            <Image src='/assets/naver_icon.png' alt='네이버 로그인' width={24} height={24} />
            네이버 아이디로 로그인
          </button>
        </>
        <div className='my-4 flex w-full items-center'>
          <div className='flex-1 border-t'></div>
          <span className='px-3 text-sm font-extralight text-gray-500'>OR</span>
          <div className='flex-1 border-t'></div>
        </div>
        <Link href={PATH.AUTH.SIGN_UP} className='font-extralight'>
          30초만에 회원가입하기
        </Link>
      </div>
    </div>
  );
};

export default SignInAuthForm;
