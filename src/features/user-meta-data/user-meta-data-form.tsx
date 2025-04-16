'use client';
import { useSession } from 'next-auth/react';
import ErrorComponent from '@/components/common/error-component';
import { academicData, jobData, typeData } from '@/features/user-meta-data/data/user-meta-data';
import useRegionsQuery from '@/features/user-meta-data/hooks/use-regions-query';
import SingleSelectField from '@/features/user-meta-data/single-select-field';
import { useMetaDataForm } from '@/features/user-meta-data/hooks/use-meta-data-form';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import Button from '@/components/ui/button';

const { TYPE, EDUCATION, JOB, MAIN_REGION, ETC } = USER_META_DATA_KEY;

const UserMetaDataForm = () => {
  const { data } = useSession();
  const userId = data?.user?.id;

  if (!userId) return <ErrorComponent />;

  const { watch, register, errors, handleSubmit, handleOnSubmit, handleSelect, isMetaDataPending, FORM_TYPE } =
    useMetaDataForm(userId);

  const { data: regions = [], isPending } = useRegionsQuery();

  if (isPending || isMetaDataPending) return <div>로딩 중..</div>;

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className='mx-auto w-2/3'>
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

      <div className='mb-4 flex h-14 flex-col justify-center'>
        <label>기타 커리어</label>
        <input className='rounded-lg border border-cool-gray-200 px-4 py-2' id={ETC} type='text' {...register(ETC)} />
      </div>
      <div className='text-center'>
        <Button variant='outline' color='dark' type='submit'>
          설정을 완료헀어요!
        </Button>
      </div>
    </form>
  );
};

export default UserMetaDataForm;
