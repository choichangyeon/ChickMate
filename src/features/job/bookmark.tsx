'use client';

import { useEffect, useState } from 'react';
import { useBookmarkMutation } from '@/features/job/hooks/use-bookmark-mutation';
import { Star } from '@/components/icons/star';

type Props = {
  jobPostingId: number;
  isBookmarked: boolean;
  userId: string;
};

const Bookmark = ({ jobPostingId, isBookmarked, userId }: Props) => {
  const { mutate: bookmarkMutate } = useBookmarkMutation({ jobPostingId, userId });

  useEffect(() => {}, [isBookmarked]);

  const handleClick = () => {
    bookmarkMutate(isBookmarked);
    // TODO: alert 구현
  };

  return isBookmarked ? (
    <button type='button' onClick={handleClick} aria-label='북마크 버튼'>
      <Star width='20' height='20' color='#FDE047' stroke='#FDE047' />
    </button>
  ) : (
    <button type='button' onClick={handleClick} aria-label='북마크 버튼'>
      <Star width='20' height='20' />
    </button>
  );
};

export default Bookmark;
