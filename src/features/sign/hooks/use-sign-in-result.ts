import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AUTH_MESSAGE } from '@/constants/message-constants';
import { PATH } from '@/constants/path-constant';

const { SIGN_IN_SUCCESS, SIGN_IN_FAILED, SOCIAL_SIGN_IN_EXIST_ERROR, SOCIAL_SIGN_IN_FAILED } = AUTH_MESSAGE.RESULT;

const NEXT_AUTH_STATUS = {
  AUTHENTICATED: 'authenticated',
  OAUTH_ACCOUNT_NOT_LINKED: 'OAuthAccountNotLinked',
  CREDENTIAL_SIGN_IN: 'CredentialsSignin',
};

const { AUTHENTICATED, OAUTH_ACCOUNT_NOT_LINKED, CREDENTIAL_SIGN_IN } = NEXT_AUTH_STATUS;

export const useSignInResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const { status } = useSession();

  useEffect(() => {
    if (status === AUTHENTICATED) {
      alert(SIGN_IN_SUCCESS);
      router.push(PATH.ON_BOARDING);
    }
  }, [status, router]);

  useEffect(() => {
    if (!error) return;

    if (error === OAUTH_ACCOUNT_NOT_LINKED) {
      alert(SOCIAL_SIGN_IN_EXIST_ERROR);
    } else if (error === CREDENTIAL_SIGN_IN) {
      alert(SIGN_IN_FAILED);
    } else {
      alert(SOCIAL_SIGN_IN_FAILED);
    }
  }, [error]);
};
