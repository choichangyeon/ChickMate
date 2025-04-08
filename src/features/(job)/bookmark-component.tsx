'use client';

import { useUser } from '@/hooks/customs/use-user';

const BookmarkComponent = () => {
  const user = useUser();

  const handleClick = async () => {
    console.log(user.id);
  };
  return (
    <div>
      BookmarkComponent
      <button onClick={handleClick}>북마크 테스트</button>
    </div>
  );
};

export default BookmarkComponent;
