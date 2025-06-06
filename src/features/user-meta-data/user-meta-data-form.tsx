'use client';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { academicData, jobData, regions, typeData } from '@/features/user-meta-data/data/user-meta-data';
import { useMetaDataForm } from '@/features/user-meta-data/hooks/use-meta-data-form';
import SelectField from '@/features/user-meta-data/select-field';
import ErrorComponent from '@/components/common/error-component';
import Button from '@/components/ui/button';
import { EXPERIENCE_AMOUNT } from '@/constants/character-constants';
import LoadingAnimation from '@/components/common/loading-animation';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';

const { EXPERIENCE_NAME, REQUIRED_EDUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;
const { FILL_OUT_META_DATA_EXP } = EXPERIENCE_AMOUNT;

const UserMetaDataForm = () => {
  const { data } = useSession();
  const userId = data?.user?.id;

  if (!userId) return <ErrorComponent />;

  const { watch, register, errors, handleSubmit, handleOnSubmit, handleSelect, isPending, isFirstTime } =
    useMetaDataForm(userId);

  if (isPending) return <LoadingAnimation />;

  return (
    <div className={clsx('mobile:mt-4 mt-10', isFirstTime && 'mt-0')}>
      {isFirstTime && (
        <span className='mb-4 block text-center font-bold text-primary-orange-600'>
          작성 완료 시 {FILL_OUT_META_DATA_EXP} 경험치 획득!
        </span>
      )}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <SelectField
          label='*관련 경력'
          options={typeData}
          value={watch(EXPERIENCE_NAME)}
          fieldKey={EXPERIENCE_NAME}
          onSelect={handleSelect}
          error={errors[EXPERIENCE_NAME]?.message}
        />
        <SelectField
          label='*최종 학력'
          options={academicData}
          value={watch(REQUIRED_EDUCATION_NAME)}
          fieldKey={REQUIRED_EDUCATION_NAME}
          onSelect={handleSelect}
          error={errors[REQUIRED_EDUCATION_NAME]?.message}
        />
        <SelectField
          label='*직무'
          options={jobData}
          value={watch(JOB_MID_CODE_NAME)}
          fieldKey={JOB_MID_CODE_NAME}
          onSelect={handleSelect}
          error={errors[JOB_MID_CODE_NAME]?.message}
        />
        <SelectField
          label='*희망 근무 지역'
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
