import { useSession } from 'next-auth/react';

export const useUserSession = () => {
  const { data } = useSession();
  if (!data || !data.user) return null;

  return data.user;
};
