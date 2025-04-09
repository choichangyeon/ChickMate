import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AUTH_MESSAGE } from '@/constants/message-constants';
import { PATH } from '@/constants/path-constant';

const { RESULT } = AUTH_MESSAGE;
const { SIGN_IN_SUCCESS, SIGN_IN_FAILED } = RESULT;

export const useSignInResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      alert(SIGN_IN_SUCCESS);
      router.push(PATH.ON_BOARDING);
    }
  }, [status, router]);

  useEffect(() => {
    if (!error) return;

    if (error === 'OAuthAccountNotLinked') {
      alert('다른 로그인 방식으로 이미 가입된 계정이에요.');
    } else if (error === 'CredentialsSignin') {
      alert(SIGN_IN_FAILED);
    } else {
      alert('소셜 로그인에 실패했어요. 다시 시도해 주세요.');
    }
  }, [error]);
};
