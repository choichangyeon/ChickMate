'use client';

import { useEffect, useState } from 'react';
import { useBookmarkQuery } from '@/features/job/hooks/use-bookmark-query';
import { useBookmarkMutation } from '@/features/job/hooks/use-bookmark-mutation';
import Button from '@/components/ui/button';

type Props = {
  jobPostingId: number;
};

const Bookmark = ({ jobPostingId }: Props) => {
  const { data: isBookmarked } = useBookmarkQuery({ jobPostingId });
  const { mutate: bookmarkMutate } = useBookmarkMutation({ jobPostingId });
  const [isMarked, setIsMarked] = useState<boolean | undefined>(isBookmarked);

  useEffect(() => {
    setIsMarked(isBookmarked);
  }, [isBookmarked]);

  // TODO : 이후에 북마크 UI 적용 코드 수정
  const handleClick = () => bookmarkMutate(isMarked!);

  return isMarked ? (
    <Button onClick={handleClick}>북마크</Button>
  ) : (
    <Button onClick={handleClick} variant='ghost'>
      북마크
    </Button>
  );
};

export default Bookmark;
