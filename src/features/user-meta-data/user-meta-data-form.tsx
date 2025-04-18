'use client';
import { useSession } from 'next-auth/react';
import ErrorComponent from '@/components/common/error-component';
import Button from '@/components/ui/button';
import { academicData, jobData, typeData } from '@/features/user-meta-data/data/user-meta-data';
import useRegionsQuery from '@/features/user-meta-data/hooks/use-regions-query';
import SingleSelectField from '@/features/user-meta-data/single-select-field';
import { useMetaDataForm } from '@/features/user-meta-data/hooks/use-meta-data-form';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';

const { EXPERIENCE_NAME, REQUIRED_EDUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;

const UserMetaDataForm = () => {
  const { data } = useSession();
  const userId = data?.user?.id;

  if (!userId) return <ErrorComponent />;

  const { watch, register, errors, handleSubmit, handleOnSubmit, handleSelect, isMetaDataPending, isFirstTime } =
    useMetaDataForm(userId);

  const { data: regions = [], isPending } = useRegionsQuery();

  if (isPending || isMetaDataPending) return <div>로딩 중..</div>;

  return (
    <div>
      {isFirstTime && (
        <span className='text-md mb-4 block text-center font-light text-primary-orange-600'>
          작성 완료 시 500 경험치 획득!
        </span>
      )}
      <form onSubmit={handleSubmit(handleOnSubmit)} className='mx-auto w-2/3'>
        <SingleSelectField
          label='*경력'
          options={typeData}
          value={watch(EXPERIENCE_NAME)}
          fieldKey={EXPERIENCE_NAME}
          onSelect={handleSelect}
          error={errors[EXPERIENCE_NAME]?.message}
        />
        <SingleSelectField
          label='*학력'
          options={academicData}
          value={watch(REQUIRED_EDUCATION_NAME)}
          fieldKey={REQUIRED_EDUCATION_NAME}
          onSelect={handleSelect}
          error={errors[REQUIRED_EDUCATION_NAME]?.message}
        />
        <SingleSelectField
          label='*직무'
          options={jobData}
          value={watch(JOB_MID_CODE_NAME)}
          fieldKey={JOB_MID_CODE_NAME}
          onSelect={handleSelect}
          error={errors[JOB_MID_CODE_NAME]?.message}
        />
        <SingleSelectField
          label='*지역'
          options={regions}
          value={watch(LOCATION_NAME)}
          fieldKey={LOCATION_NAME}
          onSelect={handleSelect}
          error={errors[LOCATION_NAME]?.message}
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
    </div>
  );
};

export default UserMetaDataForm;
