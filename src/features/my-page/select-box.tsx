import { DEFAULT } from '@/constants/user-meta-data-constants';
import type { SelectBoxType } from '@/types/select-box';

type Props = {
  options: SelectBoxType[];
  selected: string;
  onSelect: (value: SelectBoxType['value']) => void;
};

const SelectBox = ({ options, selected = DEFAULT, onSelect }: Props) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };

  return (
    <select value={selected} onChange={handleSelect}>
      <option value={DEFAULT}>선택</option>
      {options.map((option) => (
        <option key={`option_${option.value}`} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
