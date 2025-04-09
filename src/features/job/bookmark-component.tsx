'use client';

import { postBookmarkWithJobPostingId } from '@/features/job/api/client-services';
import { useEffect, useState } from 'react';
import useBookmarkQuery from '@/features/job/hooks/use-bookmark-query';

type Props = {
  jobPostingId: number;
};

const BookmarkComponent = ({ jobPostingId }: Props) => {
  const { data: isBookmarked, isLoading, error } = useBookmarkQuery({ jobPostingId });
  const [isMarked, setIsMarked] = useState(isBookmarked);

  useEffect(() => {
    setIsMarked(isBookmarked);
  }, [isBookmarked]);

  const handleClick = async () => {
    const isBookmarked = await postBookmarkWithJobPostingId({ jobPostingId, isMarked });
    setIsMarked(isBookmarked);
  };

  // 북마크 여부 확인 코드 - TODO : 이후에 북마크 UI 적용 코드 수정
  const handleClickTest = () => {
    console.log(isMarked);
  };

  if (isLoading) return <div>...loading</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      BookmarkComponent
      <button onClick={handleClick}>북마크 테스트</button>
      <button onClick={handleClickTest}>useState</button>
    </div>
  );
};

export default BookmarkComponent;
