'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { QUERY_KEY } from '@/constants/query-key';
import { PATH } from '@/constants/path-constant';
import { BOOKMARK_MESSAGE } from '@/constants/message-constants';
import { Star } from '@/components/icons/star';
import { useCharacterStore } from '@/store/use-character-store';
import { useBookmarkMutation } from '@/features/job/hooks/use-bookmark-mutation';
import { getCheckToGetEXP } from '@/features/job/api/client-services';
import { useExperienceUp } from '../character/hooks/use-experience-up';
import { CHARACTER_HISTORY, CHARACTER_HISTORY_KEY } from '@/constants/character-constants';

const { TABS_COUNT } = QUERY_KEY;
const { ADD, REMOVE, ADD_ERROR, REMOVE_ERROR, SUCCESS_WITH_EXP } = BOOKMARK_MESSAGE;
const { SIGN_IN } = PATH.AUTH;
const { BOOKMARK_JOB_POSTING } = CHARACTER_HISTORY_KEY;

type Props = {
  jobPostingId: number;
  isBookmarked: boolean;
  userId: string;
};

const Bookmark = ({ jobPostingId, isBookmarked, userId }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: bookmarkMutate, isError } = useBookmarkMutation({ jobPostingId, userId });
  const router = useRouter();

  const characterId = useCharacterStore((state) => state.characterId);
  const { handleExperienceUp } = useExperienceUp();

  const handleClick = async () => {
    try {
      await bookmarkMutate(isBookmarked);
      const isAbleToGetEXP = await getCheckToGetEXP();
      const isReqExp = characterId;

      if (isBookmarked) {
        Notify.info(REMOVE);
      } else {
        if (isReqExp && isAbleToGetEXP) handleExperienceUp(BOOKMARK_JOB_POSTING);
        Notify.info(isReqExp && isAbleToGetEXP ? SUCCESS_WITH_EXP : ADD);
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
