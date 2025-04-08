import { UserMetaDataType } from '@/types/user-meta-data-type';
import { authOptions } from '@/utils/auth-option';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { getUserMetaData } from './api/server-services';
import UserMetaDataForm from './user-meta-data-form';
import { META_DATA_QUERY_KEY } from '@/constants/query-key';
const { META_DATA } = META_DATA_QUERY_KEY;
const UserMetaDataModal = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;
  const queryClient = new QueryClient();

  if (user?.id) {
    try {
      await queryClient.prefetchQuery({
        queryKey: [META_DATA, user.id],
        queryFn: async () => getUserMetaData(user.id),
      });
    } catch (error) {
      console.error(error);
    }
  }

  const dehydratedState = dehydrate(queryClient);
  const metaData = queryClient.getQueryData<UserMetaDataType>([META_DATA, user.id]);

  return (
    <section>
      <h1>주요 이력 작성하기</h1>
      <HydrationBoundary state={dehydratedState}>
        <UserMetaDataForm user={user} initMetaData={metaData} />
      </HydrationBoundary>
    </section>
  );
};

export default UserMetaDataModal;
