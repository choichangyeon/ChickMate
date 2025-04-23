'use client';

import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PATH } from '@/constants/path-constant';
import { AUTH_MESSAGE } from '@/constants/message-constants';
import Typography from '@/components/ui/typography';
import { postSignUp } from '@/features/sign/api/client-services';
import AuthInput from '@/features/sign/auth-input';
import { SignUpFormData, schema } from '@/features/sign/data/sign-up-schema';

const SignUpAuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '', passwordCheck: '' } as SignUpFormData,
  });
  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await postSignUp(data as Required<SignUpFormData>);
      router.push(PATH.AUTH.SIGN_IN);
      Notify.success(AUTH_MESSAGE.RESULT.SIGN_UP_SUCCESS);
    } catch (error) {
      if (error instanceof Error) {
        Notify.failure(error.message);
      }
    }
  };

  return (
    <div className='mx-auto flex w-full max-w-md flex-col gap-8 rounded-3xl border border-cool-gray-200 bg-white p-6'>
      <div>
        <Typography size='2xl' weight='normal' align='center'>
          만나서 반가워요.<span className='font-bold'>칙칙</span>씨!
        </Typography>
        <Typography color='gray-700' weight='normal' align='center'>
          우리 같이 취업을 향한 여정을 떠나볼까요?
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col gap-8'>
        <div className='flex flex-col gap-8'>
          <AuthInput label='NAME' id='name' register={register} error={errors.name} type='text' />
          <AuthInput label='EMAIL' id='email' register={register} error={errors.email} type='email' />
          <AuthInput label='PASSWORD' id='password' register={register} error={errors.password} type='password' />
          <AuthInput
            label='PASSWORD CHECK'
            id='passwordCheck'
            register={register}
            error={errors.passwordCheck}
            type='password'
          />
        </div>
        <button
          type='submit'
          className='w-full rounded-lg border border-cool-gray-200 py-2 text-sm font-medium text-cool-gray-700'
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpAuthForm;
