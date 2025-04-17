import SignInAuthForm from '@/features/sign/sign-in-auth-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 - ChickMate',
  description: 'ChickMate에 가입하고 취업을 위한 여정을 떠나보아요.',
};

const SignInPage = () => {
  return <SignInAuthForm />;
};

export default SignInPage;
