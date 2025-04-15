import { getServerSession } from 'next-auth';
import TabsField from '@/features/my-page/tabs-field';
import ViewingField from '@/features/my-page/viewing-field';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';

const MyPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <article className='flex w-full items-center gap-2 px-12 py-8'>
      <ViewingField session={session} />
      <TabsField userId={session?.user.id} />
    </article>
  );
};

export default MyPage;
