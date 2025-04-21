'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AUTH_MESSAGE } from '@/constants/message-constants';
import { PATH } from '@/constants/path-constant';

const { SIGN_IN_FAILED, SOCIAL_SIGN_IN_EXIST_ERROR, SOCIAL_SIGN_IN_FAILED } = AUTH_MESSAGE.RESULT;
const { SIGN_IN } = PATH.AUTH;
const { ON_BOARDING } = PATH;

const NEXT_AUTH_STATUS = {
  OAUTH_ACCOUNT_NOT_LINKED: 'OAuthAccountNotLinked',
  CREDENTIAL_SIGN_IN: 'CredentialsSignin',
};

export const useSignInResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');
  const prevUrl = searchParams.get('prevUrl');
  const callbackUrl = searchParams.get('callbackUrl');
  const redirectTo = prevUrl || callbackUrl || ON_BOARDING;

  useEffect(() => {
    if (!error) return;
    if (error === NEXT_AUTH_STATUS.OAUTH_ACCOUNT_NOT_LINKED) {
      alert(SOCIAL_SIGN_IN_EXIST_ERROR);
    } else if (error === NEXT_AUTH_STATUS.CREDENTIAL_SIGN_IN) {
      alert(SIGN_IN_FAILED);
    } else {
      alert(SOCIAL_SIGN_IN_FAILED);
    }
    router.replace(`${SIGN_IN}?prevUrl=${redirectTo}`);
  }, [error]);
};
