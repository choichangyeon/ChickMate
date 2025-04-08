import { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useUser = (): User | null => {
  const { data } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  }, [data]);

  return user;
};
