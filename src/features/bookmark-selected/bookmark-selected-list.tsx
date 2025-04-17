'use client';
import { TABS } from '@/constants/my-page-constants';
import EmptyList from '../my-page/empty-list';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useInfiniteScroll } from '@/hooks/customs/use-infinite-scroll';
import ErrorComponent from '@/components/common/error-component';

const { BOOKMARK } = TABS;

const BookmarkSelectedList = () => {
  const { data: session } = useSession();
  const userId: User['id'] | undefined = session?.user?.id;
  const router = useRouter();

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInterviewHistoryInfiniteQuery(
    userId!
  );

  const targetRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isPending) return <div className='text-center'>로딩 중..</div>;
  if (isError) return <ErrorComponent />;

  const handleGetDetailList = (historyId: InterviewHistory['id']) => {
    router.push(`?id=${historyId}&tab=${HISTORY}`);
  };

  const histories = data.pages.flatMap((page) => page.histories);
  if (histories.length === 0) return <EmptyList tab={HISTORY} />;
  return <EmptyList tab={BOOKMARK} />;
};

export default BookmarkSelectedList;
