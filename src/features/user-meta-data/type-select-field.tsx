import type { UserMetaDataType } from '@/types/user-meta-data-type';
import React from 'react';
import { careerData, typeData } from '../user-meta-data/data/user-meta-data';
import SelectBox from '../user-meta-data/select-box';
import { onSelectType } from './user-meta-data';

type Props = {
  typeValue: UserMetaDataType['type'];
  careerValue: UserMetaDataType['career'];
  onSelect: onSelectType;
  error: string;
};

const TypeSelectField = ({ typeValue, careerValue, onSelect, error }: Props) => {
  return (
    <div className='h-14'>
      <label>*경력</label>
      <SelectBox options={typeData} selected={typeValue} onSelect={(selected) => onSelect('type', selected)} />
      {typeValue === 'experienced' && (
        <SelectBox options={careerData} selected={careerValue} onSelect={(selected) => onSelect('career', selected)} />
      )}
      <p className='h-3 text-red-500'>{error}</p>
    </div>
  );
};

export default React.memo(TypeSelectField);
