import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
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
  const path = searchParams.get('unauthorized');
  const error = searchParams.get('error');
  const { status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (status === AUTHENTICATED) {
      if (!!path) {
        signOut({ redirect: false }).then(() => {
          router.replace(pathname);
        });
        return;
      }
      alert(SIGN_IN_SUCCESS);
      window.location.replace(PATH.ON_BOARDING);
    }
  }, [status, router, path]);

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
