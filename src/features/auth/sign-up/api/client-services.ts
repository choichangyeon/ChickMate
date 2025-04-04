import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';

type Props = {
  name: string;
  email: string;
  password: string;
};

const { AUTH } = ROUTE_HANDLER_PATH;
const { SIGN_UP } = AUTH;

export const postSignUp = async (signUpData: Props) => {
  try {
    const res = await fetch(SIGN_UP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
