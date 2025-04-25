'use client';

import Typography from '@/components/ui/typography';
import { formatDate } from '@/utils/format-date';
import { useCharacterHistoryInfiniteQuery } from '@/features/character/hooks/use-character-history-infinite-query';
import { useInfiniteScroll } from '@/hooks/customs/use-infinite-scroll';
import type { CharacterType } from '@/types/DTO/character-dto';
import type { CharacterHistoryType } from '@/types/DTO/character-history-dto';
import LoadingAnimation from '@/components/common/loading-animation';

type Props = {
  characterData: CharacterType;
};

const CharacterHistoryList = ({ characterData }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError } = useCharacterHistoryInfiniteQuery(
    characterData.id
  );

  const targetRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isPending)
    return (
      <div className='flex h-[297px] items-center justify-center'>
        <LoadingAnimation />
      </div>
    );
  if (isError) return <div>에러 발생</div>;

  const characterHistories = data.pages.flatMap((page) => page.histories);

  return (
    <div className='flex h-[330px] w-full flex-col gap-4'>
      <div className='flex h-full flex-col gap-4 overflow-y-auto scroll-smooth pr-2 scrollbar-hide'>
        {characterHistories.length === 0 ? (
          <div className='flex h-full flex-col items-center justify-center'>
            <Typography size='lg'>아직 기록이 없어요.</Typography>
            <Typography size='sm' color='gray-500'>
              활동을 시작해보아요!
            </Typography>
          </div>
        ) : (
          <>
            <ul className='flex h-full flex-col gap-4'>
              {characterHistories.map((history: CharacterHistoryType) => (
                <li key={history.id} className='flex w-full items-end justify-between'>
                  <div className='flex flex-col justify-end'>
                    <Typography size='sm' color='gray-500'>
                      {formatDate({ input: history.createdAt })}
                    </Typography>
                    <Typography weight='bold'>{history.history}</Typography>
                  </div>
                  <Typography size='sm' weight='bold' color='primary-600'>
                    {history.experience} 경험치 획득!
                  </Typography>
                </li>
              ))}
            </ul>
            <div ref={targetRef} className='flex h-10 w-full items-center justify-center text-sm text-gray-400'>
              {isFetchingNextPage && <span>로딩 중...</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterHistoryList;
