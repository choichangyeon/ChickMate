'use client';

import { useBookmarkMutation } from '@/features/job/hooks/use-bookmark-mutation';
import { Star } from '@/components/icons/star';
import { PATH } from '@/constants/path-constant';
import { useRouter } from 'next/navigation';

const { SIGN_IN } = PATH.AUTH;

type Props = {
  jobPostingId: number;
  isBookmarked: boolean;
  userId: string;
};

const Bookmark = ({ jobPostingId, isBookmarked, userId }: Props) => {
  const { mutate: bookmarkMutate, isError } = useBookmarkMutation({ jobPostingId, userId });
  const router = useRouter();

  const handleClick = () => {
    bookmarkMutate(isBookmarked);
    // TODO: alert 구현
  };

  if (isError) {
    alert('로그인이 다시 진행해주시길 바랍니다.');
    router.replace(SIGN_IN);
  }

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
