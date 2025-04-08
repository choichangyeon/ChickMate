import { User } from '@/types/user';
import { useSession } from 'next-auth/react';

export const useUserSession = (): User | null => {
  const { data } = useSession();

  if (data && data.user) {
    return data.user;
  }

  return null;
};
