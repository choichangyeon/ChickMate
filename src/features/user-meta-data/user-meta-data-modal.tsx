import { UserMetaDataType } from '@/types/user-meta-data-type';
import { authOptions } from '@/utils/auth-option';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { getUserMetaData } from './api/server-services';
import UserMetaDataForm from './user-meta-data-form';
import { QUERY_KEY } from '@/constants/query-key';
import { serverActionWithSentry } from '@/utils/server-action-with-sentry';
import ErrorComponent from '@/components/common/error-component';
const { META_DATA } = QUERY_KEY;
const UserMetaDataModal = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;
  const queryClient = new QueryClient();

  if (!user) return <ErrorComponent />; // 사실상 user가 없으면 이 컴포넌트 진입 자체가 안 되지만 타입 오류로 인해 넣어둠

  if (user?.id) {
    await queryClient.prefetchQuery({
      queryKey: [META_DATA, user.id],
      queryFn: () => serverActionWithSentry(async () => getUserMetaData(user?.id)),
    });
  }

  const dehydratedState = dehydrate(queryClient);
  const metaData = queryClient.getQueryData<UserMetaDataType>([META_DATA, user?.id]);

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
