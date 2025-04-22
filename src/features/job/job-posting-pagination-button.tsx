'use client';

import LeftArrowIcon from '@/components/icons/left-arrow-icon';
import RightArrowIcon from '@/components/icons/right-arrow-icon';
import { JOB_POSTING_DATA_LIMIT } from '@/features/job/job-postings-box';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  totalCount: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const JobPostingPaginationButton = ({ totalCount, page, setPage }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const totalPageCount = Math.ceil(totalCount / JOB_POSTING_DATA_LIMIT);
  const currentGroup = Math.floor((page - 1) / 10);
  const startPage = currentGroup * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPageCount);

  const goToPage = (newPage: number) => {
    const sortOption = params.get('sortOption') || 'latest';
    setPage(newPage);
    router.push(`?sortOption=${sortOption}&page=${newPage}`);
  };

  return (
    <>
      {totalPageCount > 1 && (
        <div className='mt-6 flex flex-wrap justify-center gap-2'>
          {startPage > 1 && (
            <button onClick={() => setPage(startPage - 1)} className='rounded border text-sm'>
              <LeftArrowIcon />
            </button>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`rounded border px-3 py-1 text-sm ${pageNumber === page ? 'bg-primary-orange-600 text-white' : 'hover:bg-gray-100'}`}
            >
              {pageNumber}
            </button>
          ))}
          {endPage < totalPageCount && (
            <button onClick={() => goToPage(endPage + 1)} className='rounded border text-sm'>
              <RightArrowIcon />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default JobPostingPaginationButton;
