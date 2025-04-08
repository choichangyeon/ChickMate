import React from 'react';
import SelectBox from '../user-meta-data/select-box';
import { SelectBoxType } from '@/types/select-box';
import { onSelectType } from './user-meta-data-form';
import { UserMetaDataType } from '@/types/user-meta-data-type';

type Props = {
  label: string;
  options: SelectBoxType[];
  value: SelectBoxType['value'];
  fieldKey: keyof UserMetaDataType;
  onSelect: onSelectType;
  error: string;
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
