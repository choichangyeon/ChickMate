'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PATH } from '@/constants/path-constant';
import Typography from '@/components/ui/typography';
import AuthInput from '@/features/sign/auth-input';
import { schema, SignInFormData } from '@/features/sign/data/sign-in-schema';
import { useSignInResult } from '@/features/sign/hooks/use-sign-in-result';

const { ON_BOARDING } = PATH;

const SignInAuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' } as SignInFormData,
  });

  const searchParams = useSearchParams();
  const prevUrl = searchParams.get('prevUrl');
  const redirectToUrl = prevUrl || ON_BOARDING;

  useSignInResult();

  const onSubmit = async (data: SignInFormData) => {
    await signIn('credentials', {
      ...data,
      callbackUrl: redirectToUrl,
    });
  };

  return (
    <div className='mx-auto w-full max-w-md rounded-3xl border border-cool-gray-200 bg-white p-6'>
      <div className='mb-8'>
        <Typography size='2xl' weight='normal' align='center'>
          만나서 반가워요.<span className='font-bold'>칙칙</span>씨!
        </Typography>
        <Typography color='gray-700' weight='normal' align='center'>
          우리 같이 취업을 향한 여정을 떠나볼까요?
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthInput label='EMAIL' id='email' register={register} error={errors.email} type='email' />
        <AuthInput label='PASSWORD' id='password' register={register} error={errors.password} type='password' />
        <button
          type='submit'
          className='w-full rounded-lg border border-cool-gray-200 py-2 text-sm font-medium text-cool-gray-700'
        >
          로그인
        </button>
      </form>
      <div className='mt-2 flex flex-col gap-2 text-center'>
        <div className='flex flex-col gap-2'>
          <button
            onClick={() => signIn('google', { callbackUrl: redirectToUrl })}
            className='flex w-full items-center justify-center gap-2 rounded-lg border border-cool-gray-200 bg-white px-4 py-2 text-sm font-medium text-cool-gray-700'
          >
            <Image src='/assets/google_icon.png' alt='구글 로고' width={14} height={14} />
            구글 이메일로 로그인
          </button>
          <button
            onClick={() => signIn('naver', { callbackUrl: redirectToUrl })}
            className='bg-naver-green flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white'
          >
            <Image src='/assets/naver_icon.png' alt='네이버 로고' width={24} height={24} />
            네이버 이메일로 로그인
          </button>
        </div>
        <div className='my-4 flex w-full items-center gap-4'>
          <div className='flex-1 border-t border-cool-gray-500'></div>
          <span className='text-sm text-cool-gray-500'>OR</span>
          <div className='flex-1 border-t border-cool-gray-500'></div>
        </div>
        <Link href={PATH.AUTH.SIGN_UP} className='text-cool-gray-500'>
          30초 만에 회원가입하기
        </Link>
      </div>
    </div>
  );
};

export default SignInAuthForm;
