// features/job/job-posting-select-box.tsx
import { ChangeEvent } from 'react';
import type { SortOption } from '@/features/job/job-postings-box';

const JOB_SORT_OPTIONS: { name: string; value: SortOption }[] = [
  { name: '마감순', value: 'deadline' },
  { name: '최신순', value: 'latest' },
  { name: '오래된 순', value: 'oldest' },
  // { name: '기업명 순', value: 'company' },
  // { name: '북마크한 공고', value: 'bookmark' },
];

type Props = {
  sortOption: SortOption;
  changeNewParams: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const JobPostingSelectBox = ({ sortOption, changeNewParams }: Props) => {
  return (
    <div className='text-right'>
      <select
        value={sortOption}
        onChange={changeNewParams}
        className='mb-4 rounded-md border px-2 py-1 text-sm shadow-sm'
      >
        {JOB_SORT_OPTIONS.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobPostingSelectBox;
