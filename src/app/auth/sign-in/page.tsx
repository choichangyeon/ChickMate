import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: '로그인 - ChickMate',
  description: 'ChickMate에 가입하고 취업을 위한 여정을 떠나보아요~.',
};

const SignInAuthForm = dynamic(() => import('@/features/sign/sign-in-auth-form'), {
  ssr: false,
});

const SignInPage = () => {
  return <SignInAuthForm />;
};

export default SignInPage;
