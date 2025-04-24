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
import { SIGN_IN_INPUT } from '@/features/sign/data/sign-input';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/customs/use-debounce';

const { ON_BOARDING } = PATH;
const DELAY_TIME = 500;
const LOCAL_STORAGE_KEY = 'savedEmail';

const SignInAuthForm = () => {
  const searchParams = useSearchParams();
  const prevUrl = searchParams.get('prevUrl');
  const redirectToUrl = prevUrl || ON_BOARDING;

  const savedEmail = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}') : {};
  const [isSaveEmail, setIsSaveEmail] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { email: savedEmail.email || '', password: '' } as SignInFormData,
  });

  const watchedEmail = watch('email');
  const debouncedEmail = useDebounce(watchedEmail, DELAY_TIME);

  const onSubmit = async (data: SignInFormData) => {
    const response = await signIn('credentials', {
      ...data,
      callbackUrl: redirectToUrl,
    });

    if (!response?.ok) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ email: debouncedEmail }));
    }
  };

  return (
    <main className='mx-auto flex w-full max-w-md flex-col gap-8 rounded-3xl border border-cool-gray-200 bg-white p-6'>
      <div>
        <Typography as='h1' size='2xl' weight='normal' align='center'>
          만나서 반가워요.<span className='font-bold'>칰칰</span>씨!
        </Typography>
        <Typography color='gray-700' weight='normal' align='center'>
          우리 같이 취업을 향한 여정을 떠나볼까요?
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col gap-8'>
        <div className='flex flex-col gap-5 px-4'>
          <div className='flex flex-col gap-8'>
            {SIGN_IN_INPUT.map(({ id, label, type, placeholder }) => (
              <AuthInput
                key={id}
                label={label}
                id={id}
                type={type}
                placeholder={placeholder}
                register={register}
                error={errors[id as keyof SignInFormData]}
              />
            ))}
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='save-email'
              checked={isSaveEmail}
              onChange={(event) => setIsSaveEmail(event.target.checked)}
              className='h-4 w-4'
            />
            <label htmlFor='save-email' className='text-xs font-bold text-cool-gray-500'>
              아이디 저장
            </label>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <button
              type='submit'
              className='w-full rounded-lg border border-cool-gray-200 py-2 text-sm font-medium text-cool-gray-700'
            >
              로그인
            </button>
            <button
              type='button'
              onClick={() => signIn('google', { callbackUrl: redirectToUrl })}
              className='flex w-full items-center justify-center gap-2 rounded-lg border border-cool-gray-200 bg-white px-4 py-2 text-sm font-medium text-cool-gray-700'
            >
              <Image src='/assets/google_icon.png' alt='구글 로고' width={14} height={14} />
              구글 이메일로 로그인
            </button>
            <button
              type='button'
              onClick={() => signIn('naver', { callbackUrl: redirectToUrl })}
              className='flex w-full items-center justify-center gap-2 rounded-lg bg-naver-green px-4 py-2 text-sm font-medium text-white'
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
          <Link href={PATH.AUTH.SIGN_UP} className='text-center text-cool-gray-500'>
            30초 만에 회원가입하기
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignInAuthForm;
