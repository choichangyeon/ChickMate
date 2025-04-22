import { ChangeEvent } from 'react';
import { SortOption } from '@/features/job/job-postings-box';

type Props = {
  sortOption: SortOption;
  changeNewParams: (e: ChangeEvent<HTMLSelectElement>) => void;
};
const JobPostingSelectBox = ({ sortOption, changeNewParams }: Props) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => {
        changeNewParams(e);
      }}
      className='mb-4 rounded-md border px-2 py-1 text-sm shadow-sm'
    >
      <option value='latest'>최신순</option>
      <option value='oldest'>오래된 순</option>
      <option value='deadline'>마감 임박 순</option>
      <option value='company'>기업명 순</option>
      <option value='bookmark'>북마크한 공고</option>
    </select>
  );
};

export default JobPostingSelectBox;
