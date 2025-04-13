import React from 'react';
import SelectBox from '@/features/user-meta-data/select-box';
import { SelectBoxType } from '@/types/select-box';

import { UserMetaDataType } from '@/types/user-meta-data-type';

type Props = {
  label: string;
  options: SelectBoxType[];
  value: SelectBoxType['value'];
  fieldKey: keyof UserMetaDataType;
  onSelect: (key: keyof UserMetaDataType, selected: SelectBoxType['value']) => void;
  error?: string;
};

const SingleSelectField = ({ label, options, value, fieldKey, onSelect, error }: Props) => {
  return (
    <div className='h-14'>
      <label>{label}</label>
      <SelectBox options={options} selected={value} onSelect={(selected) => onSelect(fieldKey, selected)} />
      <p className='h-3 text-red-500'>{error}</p>
    </div>
  );
};

export default React.memo(SingleSelectField);
