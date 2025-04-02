import { ROUTE_HANDLER_PATH } from '@/constants/path-constant';

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const postSignUp = async (sign_up_data: SignUpProps) => {
  try {
    const res = await fetch(ROUTE_HANDLER_PATH.AUTH.SIGN_UP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sign_up_data),
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
