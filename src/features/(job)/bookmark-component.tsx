'use client';

import { postBookmarkWithUserId } from '@/features/(job)/api/client-services';

const BookmarkComponent = () => {
  const handleClick = async () => {
    await postBookmarkWithUserId(1);
  };
  return (
    <div>
      BookmarkComponent
      <button onClick={handleClick}>북마크 테스트</button>
    </div>
  );
};

export default BookmarkComponent;
