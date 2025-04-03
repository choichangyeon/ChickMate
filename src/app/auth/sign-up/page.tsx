import SignUpAuthForm from '@/features/auth/sign-up/sign-up-auth-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - ChickMate',
  description: 'ChickMate에 가입하고 취업을 위한 여정을 떠나보아요~.',
};


const SignUpPage = () => {
  return <SignUpAuthForm />;
};

export default SignUpPage;
