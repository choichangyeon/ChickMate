'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Notify } from 'notiflix';
import { PATH } from '@/constants/path-constant';
import { AUTH_MESSAGE } from '@/constants/message-constants';

const { SIGN_IN_FAILED, SOCIAL_SIGN_IN_EXIST_ERROR, SOCIAL_SIGN_IN_FAILED } = AUTH_MESSAGE.RESULT;
const { SIGN_IN } = PATH.AUTH;
const { ON_BOARDING } = PATH;

const NEXT_AUTH_STATUS = {
  OAUTH_ACCOUNT_NOT_LINKED: 'OAuthAccountNotLinked',
  CREDENTIAL_SIGN_IN: 'CredentialsSignin',
  UNEXPECTED_JSON: 'Unexpected end of JSON input',
};

export const useSignInResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl');
  const redirectTo = callbackUrl || ON_BOARDING;

  useEffect(() => {
    if (!error) return;
    if (error === NEXT_AUTH_STATUS.OAUTH_ACCOUNT_NOT_LINKED) {
      Notify.failure(SOCIAL_SIGN_IN_EXIST_ERROR);
    } else if (error === NEXT_AUTH_STATUS.CREDENTIAL_SIGN_IN) {
      Notify.failure(SOCIAL_SIGN_IN_EXIST_ERROR);
    } else if (error === NEXT_AUTH_STATUS.UNEXPECTED_JSON) {
      Notify.failure(SIGN_IN_FAILED);
    } else {
      Notify.failure(SOCIAL_SIGN_IN_FAILED);
    }

    router.replace(`${SIGN_IN}?prevUrl=${redirectTo}`);
  }, [error]);
};
