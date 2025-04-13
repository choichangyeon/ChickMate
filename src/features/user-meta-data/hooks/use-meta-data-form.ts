'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseMetaDataQuery } from '@/features/user-meta-data/hooks/use-meta-data-query';
import useMetaDataMutation from '@/features/user-meta-data/hooks/use-meta-data-mutation';
import { userMetaFormSchema, UserMetaSchema } from '@/features/user-meta-data/data/user-meta-form-schema';
import { DEFAULT, USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { PATH } from '@/constants/path-constant';
import { USER_META_DATA_FORM_MESSAGE } from '@/constants/message-constants';
import { useModalStore } from '@/store/use-modal-store';
import { MODAL_ID } from '@/constants/modal-id-constants';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import type { SelectBoxType } from '@/types/select-box';

const { TYPE, EDUCATION, JOB, MAIN_REGION, ETC } = USER_META_DATA_KEY;
const {
  AUTH: { SIGN_IN },
} = PATH;
const {
  API: { POST_DATA_SUCCESS },
} = USER_META_DATA_FORM_MESSAGE;
const { USER_META_DATA } = MODAL_ID;

export const useMetaDataForm = (userId: string) => {
  const { data: metaData, isPending: isMetaDataPending } = UseMetaDataQuery({ userId });
  const { mutate, error } = useMetaDataMutation(userId);
  const toggleModal = useModalStore((state) => state.toggleModal);
  const {
    setValue,
    watch,
    trigger,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserMetaSchema>({
    defaultValues: {
      [TYPE]: DEFAULT,
      [EDUCATION]: DEFAULT,
      [JOB]: DEFAULT,
      [MAIN_REGION]: DEFAULT,
      [ETC]: null,
    },
    mode: 'onBlur',
    resolver: zodResolver(userMetaFormSchema),
  });

  useEffect(() => {
    if (metaData) {
      reset({
        [TYPE]: metaData?.[TYPE] ?? DEFAULT,
        [EDUCATION]: metaData?.[EDUCATION] ?? DEFAULT,
        [JOB]: metaData?.[JOB] ?? DEFAULT,
        [MAIN_REGION]: metaData?.[MAIN_REGION] ?? DEFAULT,
        [ETC]: metaData?.[ETC] ?? null,
      });
    }
  }, [metaData, reset]);

  useEffect(() => {
    if (error instanceof Error) {
      alert(error.message);
      window.location.replace(SIGN_IN);
    }
  }, [error]);

  const handleSelect = useCallback(
    (key: keyof UserMetaDataType, selected: SelectBoxType['value']) => {
      setValue(key, selected);
      trigger(key);
    },
    [setValue, trigger]
  );

  const handleOnSubmit = (values: UserMetaDataType) => {
    mutate(values, {
      onSuccess: () => {
        alert(POST_DATA_SUCCESS);
        toggleModal(USER_META_DATA);
      },
    });
  };

  const FORM_TYPE = useMemo(() => (metaData && Object.keys(metaData).length !== 0 ? '수정' : '작성'), [metaData]);

  return {
    userId,
    watch,
    register,
    errors,
    handleSubmit,
    handleOnSubmit,
    handleSelect,
    isMetaDataPending,
    FORM_TYPE,
  };
};
