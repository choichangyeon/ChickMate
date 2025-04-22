'use client';

import { useBookmarkMutation } from '@/features/job/hooks/use-bookmark-mutation';
import { Star } from '@/components/icons/star';
import { PATH } from '@/constants/path-constant';
import { useRouter } from 'next/navigation';

const { SIGN_IN } = PATH.AUTH;

import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
const { TABS_COUNT } = QUERY_KEY;
type Props = {
  jobPostingId: number;
  isBookmarked: boolean;
  userId: string;
};

const Bookmark = ({ jobPostingId, isBookmarked, userId }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: bookmarkMutate, isError } = useBookmarkMutation({ jobPostingId, userId });
  const router = useRouter();

  const handleClick = async () => {
    try {
      await bookmarkMutate(isBookmarked);
      queryClient.invalidateQueries({ queryKey: [TABS_COUNT] });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }

    // TODO: alert 구현
  };

  if (isError) {
    alert('로그인을 다시 진행해주시길 바랍니다.');
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
