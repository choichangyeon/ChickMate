import SignUpAuthForm from '@/features/sign/sign-up-auth-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - ChickMate',
  description: 'ChickMate에 가입하고 취업을 위한 여정을 떠나보아요~.',
};

const SignUpPage = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <SignUpAuthForm />
    </div>
  );
};

export default SignUpPage;
