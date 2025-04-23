'use client';

import { useBookmarkMutation } from '@/features/job/hooks/use-bookmark-mutation';
import { Star } from '@/components/icons/star';
import { PATH } from '@/constants/path-constant';
import { useRouter } from 'next/navigation';

const { SIGN_IN } = PATH.AUTH;

import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import { Notify } from 'notiflix';
import { BOOKMARK_MESSAGE } from '@/constants/message-constants';

type Props = {
  jobPostingId: number;
  isBookmarked: boolean;
  userId: string;
};

const { TABS_COUNT } = QUERY_KEY;
const { ADD, REMOVE, ADD_ERROR, REMOVE_ERROR } = BOOKMARK_MESSAGE;

const Bookmark = ({ jobPostingId, isBookmarked, userId }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: bookmarkMutate, isError } = useBookmarkMutation({ jobPostingId, userId });
  const router = useRouter();

  const handleClick = async () => {
    try {
      await bookmarkMutate(isBookmarked);
      if (isBookmarked) {
        Notify.info(REMOVE);
      } else {
        Notify.info(ADD);
      }
      queryClient.invalidateQueries({ queryKey: [TABS_COUNT] });
    } catch (error) {
      if (error instanceof Error) {
        if (isBookmarked) {
          Notify.info(REMOVE_ERROR);
        } else {
          Notify.info(ADD_ERROR);
        }
      }
    }
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
