'use client';
import ErrorComponent from '@/components/common/error-component';
import Button from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { CHARACTER_HISTORY, CHARACTER_HISTORY_KEY } from '@/constants/character-constants';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { academicData, jobData, typeData } from '@/features/user-meta-data/data/user-meta-data';
import { useMetaDataForm } from '@/features/user-meta-data/hooks/use-meta-data-form';
import useRegionsQuery from '@/features/user-meta-data/hooks/use-regions-query';
import SingleSelectField from '@/features/user-meta-data/single-select-field';
import { useSession } from 'next-auth/react';

const { EXPERIENCE_NAME, REQUIRED_EDUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;
const { FILL_OUT_META_DATA } = CHARACTER_HISTORY_KEY;
const EXP = CHARACTER_HISTORY[FILL_OUT_META_DATA].amount;

const UserMetaDataForm = () => {
  const { data } = useSession();
  const userId = data?.user?.id;

  if (!userId) return <ErrorComponent />;

  const { watch, register, errors, handleSubmit, handleOnSubmit, handleSelect, isMetaDataPending, isFirstTime } =
    useMetaDataForm(userId);

  const { data: regions = [], isPending } = useRegionsQuery();

  if (isPending || isMetaDataPending) return <LoadingSpinner />;

  return (
    <div>
      {isFirstTime && (
        <span className='mb-4 block text-center font-bold text-primary-orange-600'>
          작성 완료 시 {EXP} 경험치 획득!
        </span>
      )}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
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

        <div className='mb-4 flex min-h-14 flex-col justify-center'>
          <label className='mb-2 text-cool-gray-300'>ex. 수상이력, 자격증 등</label>
          <input
            className='active: rounded-[8px] border border-cool-gray-200 px-4 py-2'
            id={ETC}
            type='text'
            {...register(ETC)}
          />
        </div>
        <div className='text-center'>
          <Button type='submit' fontWeight='bold'>
            설정을 완료헀어요!
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserMetaDataForm;
