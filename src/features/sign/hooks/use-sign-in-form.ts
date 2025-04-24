import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Notify } from 'notiflix';
import useDebounce from '@/hooks/customs/use-debounce';
import { schema, SignInFormData } from '../data/sign-in-schema';
import { PATH } from '@/constants/path-constant';
import { AUTH_MESSAGE } from '@/constants/message-constants';

const { SIGN_IN_FAILED, SOCIAL_SIGN_IN_EXIST_ERROR, SOCIAL_SIGN_IN_FAILED } = AUTH_MESSAGE.RESULT;
const { ON_BOARDING } = PATH;
const DELAY_TIME = 500;
const LOCAL_STORAGE_KEY = 'savedEmail';

const NEXT_AUTH_STATUS = {
  OAUTH_ACCOUNT_NOT_LINKED: 'OAuthAccountNotLinked',
  CREDENTIAL_SIGN_IN: 'CredentialsSignin',
  UNEXPECTED_JSON: 'Unexpected end of JSON input',
};

export const useSignInForm = () => {
  const searchParams = useSearchParams();
  const prevUrl = searchParams.get('prevUrl');
  const redirectToUrl = prevUrl || ON_BOARDING;

  const savedEmail = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}') : {};
  const [isSaveEmail, setIsSaveEmail] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { email: savedEmail.email || '', password: '' },
  });

  const watchedEmail = watch('email');
  const debouncedEmail = useDebounce(watchedEmail, DELAY_TIME);

  const onSubmit = async (data: SignInFormData) => {
    if (isSaveEmail) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ email: debouncedEmail }));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    const response = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (response?.ok) {
      window.location.href = redirectToUrl;
    } else {
      switch (response?.error) {
        case NEXT_AUTH_STATUS.OAUTH_ACCOUNT_NOT_LINKED:
        case NEXT_AUTH_STATUS.CREDENTIAL_SIGN_IN:
          Notify.failure(SOCIAL_SIGN_IN_EXIST_ERROR);
          break;
        case NEXT_AUTH_STATUS.UNEXPECTED_JSON:
          Notify.failure(SIGN_IN_FAILED);
          break;
        default:
          Notify.failure(SOCIAL_SIGN_IN_FAILED);
          break;
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSaveEmail,
    setIsSaveEmail,
    onSubmit,
    redirectToUrl,
  };
};
