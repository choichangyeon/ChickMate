import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { AUTH_MESSAGE } from '@/constants/message-constants';
import { PATH, QUERY_PARAMS } from '@/constants/path-constant';
import { useExperienceUp } from '@/features/character/hooks/use-experience-up';
import { CHARACTER_HISTORY_KEY } from '@/constants/character-constants';
import { useGetCharacterQuery } from '@/features/character/hooks/use-get-character-query';
import { useCharacterStoreSync } from '@/features/character/hooks/use-character-store-sync';
import { useCharacterStore } from '@/store/use-character-store';

const { SIGN_IN_SUCCESS, SIGN_IN_FAILED, SOCIAL_SIGN_IN_EXIST_ERROR, SOCIAL_SIGN_IN_FAILED } = AUTH_MESSAGE.RESULT;

const NEXT_AUTH_STATUS = {
  AUTHENTICATED: 'authenticated',
  OAUTH_ACCOUNT_NOT_LINKED: 'OAuthAccountNotLinked',
  CREDENTIAL_SIGN_IN: 'CredentialsSignin',
};

const { AUTHENTICATED, OAUTH_ACCOUNT_NOT_LINKED, CREDENTIAL_SIGN_IN } = NEXT_AUTH_STATUS;

const { ERROR, UNAUTH } = QUERY_PARAMS;

const {
  ON_BOARDING,
  AUTH: { SIGN_IN },
} = PATH;

const { LOGIN } = CHARACTER_HISTORY_KEY;

export const useSignInResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = searchParams.get(UNAUTH);
  const error = searchParams.get(ERROR);
  const { status } = useSession();
  const pathname = usePathname();
  const { data: characterData } = useGetCharacterQuery();
  useCharacterStoreSync(characterData);
  const characterId = useCharacterStore((state) => state.characterId);
  const { handleExperienceUp } = useExperienceUp();

  useEffect(() => {
    if (status === AUTHENTICATED) {
      if (!!path) {
        signOut({ redirect: false }).then(() => {
          router.replace(pathname);
          router.refresh();
        });
        return;
      }
      alert(SIGN_IN_SUCCESS);
      router.replace(ON_BOARDING);

      if (characterId !== null) {
        handleExperienceUp(LOGIN);
      }
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
    router.replace(SIGN_IN);
  }, [error]);
};
