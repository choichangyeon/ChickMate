import TabsField from '@/features/my-page/tabs-field';
import ViewingField from '@/features/my-page/viewing-field';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';

const MyPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <article className='mobile:gap-2 mobile:h-[calc(100%-65px)] flex h-full w-full flex-col items-stretch justify-evenly gap-5 desktop:flex-row'>
      <ViewingField session={session} />

      <TabsField userId={session?.user.id} />
    </article>
  );
};

export default MyPage;
