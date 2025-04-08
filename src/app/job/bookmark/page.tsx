import React from 'react';
import BookmarkComponent from '@/features/(job)/bookmark-component';
import { serverSession } from '@/utils/server-session';

const BookmarkPage = async () => {
  const user = await serverSession();

  return (
    <div>
      BookmarkPage
      <BookmarkComponent />
    </div>
  );
};

export default BookmarkPage;
