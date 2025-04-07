'use client';
import { DEFAULT, USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import type { SelectBoxType } from '@/types/select-box';
import { RegionsType, type UserMetaDataType } from '@/types/user-meta-data-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { getRegions, getUserMetaData, postUserMetaData } from './api/client-services';
import { academicData, jobData, mainRegion, typeData } from './data/user-meta-data';
import { userMetaFormSchema, UserMetaSchema } from './data/user-meta-form-schema';
import SingleSelectField from './single-select-field';

export type onSelectType = (key: keyof UserMetaDataType, value: SelectBoxType['value']) => void;

const { TYPE, EDUCATION, JOB, MAIN_REGION, ETC } = USER_META_DATA_KEY;
// const dependencyMap: DependencyMap = {
//   type: {
//     children: ['career'],
//     condition: (value: UserMetaDataType['type']) => value === 'experienced',
//   },
//   mainRegion: {
//     children: ['subRegion'],
//     condition: (value: UserMetaDataType['mainRegion']) => value !== DEFAULT,
//   },
// }; => 사람인 api 연결 시 사용

const UserMetaData = () => {
  const { data } = useSession();
  const userId = data?.user?.id ?? null;
  const [regions, setRegions] = useState([]);

  const handleSelect = useCallback((key: keyof UserMetaDataType, selected: SelectBoxType['value']) => {
    // if (dependencyMap[key]) {
    //   const { children, condition } = dependencyMap[key];
    //   if (!condition(selected) || selected !== getValues(key)) {
    //     children.forEach((childKey) => {
    //       setValue(childKey, DEFAULT);
    //     });
    //   }
    // } => 사람인 api 연결 시 사용
    setValue(key, selected);
    trigger(key);
  }, []);

  const getLocation = async () => {
    const res = await getRegions();
    setRegions(res);
  };
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (userId) getUserMetaData(userId);
  }, [userId]);

  const {
    setValue,
    watch,
    trigger,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserMetaSchema>({
    defaultValues: {
      [TYPE]: DEFAULT,
      // career: DEFAULT, => 경력기간 :  사람인 api 연결 시 사용
      [EDUCATION]: DEFAULT,
      [JOB]: DEFAULT,
      [MAIN_REGION]: DEFAULT, // => 사람인 api 연결 시 삭제 (상위 지역)
      // mainRegion: DEFAULT, => 상위지역 (ex:서울,경기):  사람인 api 연결 시 사용
      // subRegion: DEFAULT, => 하위지역 (ex:용산구,이천시):  사람인 api 연결 시 사용
      [ETC]: null,
    },
    mode: 'onBlur',
    resolver: zodResolver(userMetaFormSchema),
  });

  const handleOnSubmit = (values: FieldValues) => {
    console.log('values=>', values);
    postUserMetaData(userId, values);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1>주요 이력 작성하기</h1>
      <SingleSelectField
        label='*경력'
        options={typeData}
        value={watch(TYPE)}
        fieldKey={TYPE}
        onSelect={handleSelect}
        error={errors[TYPE]?.message}
      />

      {/* -------- 사람인 api 사용 START -------*/}
      {/* <TypeSelectField
        typeValue={watch('type')}
        careerValue={watch('career')}
        onSelect={handleSelect}
        error={errors['type']?.message || errors['career']?.message}
      /> */}
      {/* -------- 사람인 api 사용 END --------- */}

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

      {/* -------- 사람인 api 사용 START -------*/}
      {/* <RegionSelectField
        mainRegionValue={watch('mainRegion')}
        subRegionValue={watch('subRegion')}
        onSelect={handleSelect}
        error={errors['mainRegion']?.message || errors['subRegion']?.message}
      /> */}
      {/* -------- 사람인 api 사용 END -------*/}

      <div className='h-14'>
        <label>기타 커리어</label>
        <input id={ETC} type='text' {...register(ETC)} />
      </div>
      <button>내 정보 작성 완료</button>
    </form>
  );
};

export default UserMetaData;
