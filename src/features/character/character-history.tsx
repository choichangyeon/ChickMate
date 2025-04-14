import Typography from '@/components/ui/typography';
import { formatDate } from '@/utils/format-date';
import { Character, CharacterHistory } from '@prisma/client';
import React, { useState } from 'react';

type Props = {
  characterData: Character & { characterHistories: CharacterHistory[] };
};

const ITEMS_PER_PAGE = 5;

const CharacterHistoryList = ({ characterData }: Props) => {
  const [page, setPage] = useState<number>(1);

  const totalItems = characterData.characterHistories.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedHistories = characterData.characterHistories.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className='flex h-full w-full flex-col justify-between gap-4 p-8'>
      <ul className='flex flex-col gap-4'>
        {paginatedHistories.map((history) => (
          <li key={history.id} className='flex w-full items-center justify-between'>
            <div className='flex flex-col'>
              <Typography size='xs' color='gray-500'>
                {formatDate({ input: history.createdAt })}
              </Typography>
              <Typography size='xl'>{history.history}</Typography>
            </div>
            <Typography color='primary-600'>{history.experience} 경험치 획득!</Typography>
          </li>
        ))}
      </ul>
      <div className='flex items-center justify-center gap-2'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            className={`rounded-md border px-3 py-1 ${
              page === pageNum ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterHistoryList;
