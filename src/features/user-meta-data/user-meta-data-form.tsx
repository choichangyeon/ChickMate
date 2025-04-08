'use client';
import { DEFAULT, USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import type { SelectBoxType } from '@/types/select-box';
import type { User } from '@/types/user';
import { type UserMetaDataType } from '@/types/user-meta-data-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { academicData, jobData, typeData } from './data/user-meta-data';
import { userMetaFormSchema, UserMetaSchema } from './data/user-meta-form-schema';
import useMetaDataMutation from './hooks/use-meta-data-mutation';
import useRegionsQuery from './hooks/use-regions-query';
import SingleSelectField from './single-select-field';

export type onSelectType = (key: keyof UserMetaDataType, value: SelectBoxType['value']) => void;

const { TYPE, EDUCATION, JOB, MAIN_REGION, ETC } = USER_META_DATA_KEY;

type Props = {
  user: User;
  initMetaData?: UserMetaDataType;
};
const UserMetaDataForm = ({ user, initMetaData }: Props) => {
  const userId = user.id ?? null;
  const FORM_TYPE = initMetaData ? '수정' : '작성';
  const { data: regions, isPending } = useRegionsQuery();
  const { mutate } = useMetaDataMutation(userId);

  const handleSelect = useCallback((key: keyof UserMetaDataType, selected: SelectBoxType['value']) => {
    setValue(key, selected);
    trigger(key);
  }, []);

  const {
    setValue,
    watch,
    trigger,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserMetaSchema>({
    defaultValues: {
      [TYPE]: initMetaData?.[TYPE] ?? DEFAULT,
      [EDUCATION]: initMetaData?.[EDUCATION] ?? DEFAULT,
      [JOB]: initMetaData?.[JOB] ?? DEFAULT,
      [MAIN_REGION]: initMetaData?.[MAIN_REGION] ?? DEFAULT,
      [ETC]: initMetaData?.[ETC] ?? null,
    },
    mode: 'onBlur',
    resolver: zodResolver(userMetaFormSchema),
  });

  const handleOnSubmit = (values: UserMetaDataType) => {
    mutate(values);
  };

  if (isPending) return <div>로딩 중..</div>;

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <SingleSelectField
        label='*경력'
        options={typeData}
        value={watch(TYPE)}
        fieldKey={TYPE}
        onSelect={handleSelect}
        error={errors[TYPE]?.message}
      />
      <SingleSelectField
        label='*학력'
        options={academicData}
        value={watch(EDUCATION)}
        fieldKey={EDUCATION}
        onSelect={handleSelect}
        error={errors[EDUCATION]?.message}
      />

      <SingleSelectField
        label='*직무'
        options={jobData}
        value={watch(JOB)}
        fieldKey={JOB}
        onSelect={handleSelect}
        error={errors[JOB]?.message}
      />

      <SingleSelectField
        label='*지역'
        options={regions}
        value={watch(MAIN_REGION)}
        fieldKey={MAIN_REGION}
        onSelect={handleSelect}
        error={errors[MAIN_REGION]?.message}
      />

      <div className='h-14'>
        <label>기타 커리어</label>
        <input id={ETC} type='text' {...register(ETC)} />
      </div>
      <button>{`내 정보 ${FORM_TYPE} 완료`}</button>
    </form>
  );
};

export default UserMetaDataForm;
