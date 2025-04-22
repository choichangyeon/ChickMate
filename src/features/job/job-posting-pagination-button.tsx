import { JOB_POSTING_DATA_LIMIT } from '@/features/job/job-postings-box';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  totalCount: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const JobPostingPaginationButton = ({ totalCount, page, setPage }: Props) => {
  const totalPageCount = Math.ceil((totalCount) / JOB_POSTING_DATA_LIMIT);
  const currentGroup = Math.floor((page - 1) / 10);
  const startPage = currentGroup * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPageCount);
  return (
    <>
      {totalPageCount > 1 && (
        <div className='mt-6 flex flex-wrap justify-center gap-2'>
          {startPage > 1 && (
            <button onClick={() => setPage(startPage - 1)} className='rounded border px-3 py-1 text-sm'>
              &laquo;
            </button>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`rounded border px-3 py-1 text-sm ${pageNumber === page ? 'bg-primary-orange-600 text-white' : 'hover:bg-gray-100'}`}
            >
              {pageNumber}
            </button>
          ))}
          {endPage < totalPageCount && (
            <button onClick={() => setPage(endPage + 1)} className='rounded border px-3 py-1 text-sm'>
              &raquo;
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default JobPostingPaginationButton;
