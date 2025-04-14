'use client';

import { useEffect, useState } from 'react';
import { useBookmarkQuery } from '@/features/job/hooks/use-bookmark-query';
import { useBookmarkMutation } from '@/features/job/hooks/use-bookmark-mutation';

type Props = {
  jobPostingId: number;
};

const Bookmark = ({ jobPostingId }: Props) => {
  const { data: isBookmarked } = useBookmarkQuery({ jobPostingId });
  const { mutate } = useBookmarkMutation({ jobPostingId });
  const [isMarked, setIsMarked] = useState<boolean | undefined>(isBookmarked);

  useEffect(() => {
    setIsMarked(isBookmarked);
  }, [isBookmarked]);

  // TODO : 이후에 북마크 UI 적용 코드 수정
  const handleClick = () => mutate(isMarked!);

  return <button onClick={handleClick}>북마크</button>;
};

export default Bookmark;
