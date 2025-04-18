'use client';
import { TABS } from '@/constants/my-page-constants';
import EmptyList from '@/features/my-page/empty-list';
import { useSession } from 'next-auth/react';
import { useInfiniteScroll } from '@/hooks/customs/use-infinite-scroll';
import ErrorComponent from '@/components/common/error-component';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useBookmarkSelectedInfiniteQuery } from '@/features/bookmark-selected/hook/use-bookmark-selected-infinite-query';
import BookmarkTab from '@/features/bookmark-selected/bookmark-tab';

const { BOOKMARK } = TABS;

const BookmarkSelectedList = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useBookmarkSelectedInfiniteQuery(
    userId || ''
  );

  const targetRef = useInfiniteScroll({ fetchNextPage, hasNextPage });

  if (status === 'loading') {
    return (
      <section className='flex h-[70dvh] flex-col items-center justify-center'>
        <LoadingSpinner />
      </section>
    );
  }

  if (!userId) return <ErrorComponent />;

  if (isPending) {
    return (
      <section className='flex h-[70dvh] flex-col items-center justify-center'>
        <LoadingSpinner />
      </section>
    );
  }

  if (isError) return <ErrorComponent />;

  const bookmarkList = data.pages.flatMap((page) => page.bookmarkList);
  if (bookmarkList.length === 0) return <EmptyList tab={BOOKMARK} />;

  return (
    <section className='flex h-[70dvh] flex-col'>
      <div className='flex-1 overflow-hidden'>
        <ul className='h-full overflow-y-auto scrollbar-hide'>
          {bookmarkList.map((bookmark, idx, arr) => (
            <BookmarkTab key={bookmark.id} bookmark={bookmark} index={idx} length={arr.length} userId={userId} />
          ))}
          <div ref={targetRef} className='flex h-10 w-full items-center justify-center text-sm text-gray-400'>
            {isFetchingNextPage && <LoadingSpinner size='sm' />}
          </div>
        </ul>
      </div>
    </section>
  );
};

export default BookmarkSelectedList;
