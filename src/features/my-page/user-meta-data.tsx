'use client';
import { DEFAULT } from '@/constants/user-meta-data-constants';
import type { SelectBoxType } from '@/types/select-box';
import type { DependencyMap, UserMetaDataType } from '@/types/user-meta-data-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { academicData, jobData } from './data/user-meta-data';
import { userMetaFormSchema } from './data/user-meta-form-schema';
import RegionSelectField from './region-select-field';
import SingleSelectField from './single-select-field';
import TypeSelectField from './type-select-field';

export type onSelectType = (key: keyof UserMetaDataType, value: SelectBoxType['value']) => void;

const dependencyMap: DependencyMap = {
  type: {
    children: ['career'],
    condition: (value: UserMetaDataType['type']) => value === 'experienced',
  },
  mainRegion: {
    children: ['subRegion'],
    condition: (value: UserMetaDataType['mainRegion']) => value !== DEFAULT,
  },
};

const UserMetaData = () => {
  const handleSelect = useCallback((key: keyof UserMetaDataType, selected: SelectBoxType['value']) => {
    if (dependencyMap[key]) {
      const { children, condition } = dependencyMap[key];
      if (!condition(selected) || selected !== getValues(key)) {
        children.forEach((childKey) => {
          setValue(childKey, DEFAULT);
        });
      }
    }
    setValue(key, selected);
    trigger(key);
  }, []);

  const {
    setValue,
    watch,
    trigger,
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: DEFAULT,
      career: DEFAULT,
      academic: DEFAULT,
      job: DEFAULT,
      mainRegion: DEFAULT,
      subRegion: DEFAULT,
      etc: null,
    },
    mode: 'onBlur',
    resolver: zodResolver(userMetaFormSchema),
  });

  const handleOnSubmit = (values: FieldValues) => {
    //@TODO: 서버 전송
    console.log('values=>', values);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1>주요 이력 작성하기</h1>
      <TypeSelectField
        typeValue={watch('type')}
        careerValue={watch('career')}
        onSelect={handleSelect}
        error={errors['type']?.message || errors['career']?.message}
      />
      <SingleSelectField
        label='*학력'
        options={academicData}
        value={watch('academic')}
        fieldKey='academic'
        onSelect={handleSelect}
        error={errors['academic']?.message}
      />
      <SingleSelectField
        label='*직무'
        options={jobData}
        value={watch('job')}
        fieldKey='job'
        onSelect={handleSelect}
        error={errors['job']?.message}
      />
      <RegionSelectField
        mainRegionValue={watch('mainRegion')}
        subRegionValue={watch('subRegion')}
        onSelect={handleSelect}
        error={errors['mainRegion']?.message || errors['subRegion']?.message}
      />
      <div className='h-14'>
        <label>기타 커리어</label>
        <input id='etc' type='text' {...register('etc')} />
      </div>
      <button>내 정보 작성 완료</button>
    </form>
  );
};

export default UserMetaData;
