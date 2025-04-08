import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-option';
import { User } from '@/types/user';

export const serverSessionAboutUser = async (): Promise<User> => {
  const { user } = await getServerSession(authOptions);
  return user;
};
