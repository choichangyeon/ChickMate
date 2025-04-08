import React from 'react';
import BookmarkComponent from '@/features/(job)/bookmark-component';

const BookmarkPage = async () => {
  return (
    <div>
      BookmarkPage
      <BookmarkComponent jobPostingId={1} />
    </div>
  );
};

export default BookmarkPage;
