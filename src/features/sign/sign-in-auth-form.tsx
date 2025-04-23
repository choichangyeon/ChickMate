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
    <div className='mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-md'>
      <div className='mb-8'>
        <Typography size='2xl' weight='normal' align='center'>
          만나서 반가워요.<span className='font-bold'>칙칙</span>씨!
        </Typography>
        <Typography weight='normal' align='center'>
          우리 같이 취업을 향한 여정을 떠나볼까요?
        </Typography>
      </div>
      <div className='mb-8'>
        <Typography color='primary-600' weight='bold' align='center' as='h1'>
          원할한 서비스 이용을 위해 로그인 해주세요.
        </Typography>
      </div>
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
            onClick={() => signIn('google', { callbackUrl: redirectToUrl })}
            className='flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm'
          >
            <Image src='/assets/google_icon.png' alt='구글 로그인' width={14} height={14} />
            구글 이메일로 로그인
          </button>
          <button
            onClick={() => signIn('naver', { callbackUrl: redirectToUrl })}
            className='flex w-full items-center justify-center gap-2 rounded-md bg-[#03C75A] px-4 py-2 text-sm font-bold text-white shadow-sm'
          >
            <Image src='/assets/naver_icon.png' alt='네이버 로그인' width={24} height={24} />
            네이버 이메일로 로그인
          </button>
        </>
        <div className='my-4 flex w-full items-center'>
          <div className='flex-1 border-t'></div>
          <span className='px-3 text-sm font-extralight text-gray-500'>OR</span>
          <div className='flex-1 border-t'></div>
        </div>
        <Link href={PATH.AUTH.SIGN_UP} className='font-extralight'>
          <Typography align='center'> 30초만에 회원가입하기</Typography>
        </Link>
      </div>
    </div>
  );
};

export default SignInAuthForm;
