'use client';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { useMetaDataQuery } from '@/features/user-meta-data/hooks/use-meta-data-query';
import useMetaDataMutation from '@/features/user-meta-data/hooks/use-meta-data-mutation';
import { useExperienceUp } from '@/features/character/hooks/use-experience-up';
import { userMetaFormSchema, UserMetaSchema } from '@/features/user-meta-data/data/user-meta-form-schema';
import { useCharacterStore } from '@/store/use-character-store';
import { useModalStore } from '@/store/use-modal-store';
import { DEFAULT, USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { PATH } from '@/constants/path-constant';
import { USER_META_DATA_FORM_MESSAGE } from '@/constants/message-constants';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { CHARACTER_HISTORY_KEY } from '@/constants/character-constants';
import { QUERY_KEY } from '@/constants/query-key';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import type { SelectBoxType } from '@/types/select-box';
import type { UserType } from '@/types/DTO/user-dto';

const { EXPERIENCE_NAME, REQUIRED_EDUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;
const {
  AUTH: { SIGN_IN },
} = PATH;
const {
  API: { POST_DATA_SUCCESS, CHARACTER_POST_SUCCESS_WITH_EXP },
} = USER_META_DATA_FORM_MESSAGE;
const { USER_META_DATA } = MODAL_ID;
const { FILL_OUT_META_DATA } = CHARACTER_HISTORY_KEY;
const { JOB_POSTING } = QUERY_KEY;

export const useMetaDataForm = (userId: UserType['id']) => {
  const { data: metaData, isPending } = useMetaDataQuery({ userId });
  const { mutateAsync, error } = useMetaDataMutation(userId);
  const toggleModal = useModalStore((state) => state.toggleModal);
  const { handleExperienceUp } = useExperienceUp();
  const characterId = useCharacterStore((state) => state.characterId);
  const queryClient = useQueryClient();

  const isFirstTime = metaData === null && characterId !== null;

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
      [EXPERIENCE_NAME]: DEFAULT,
      [REQUIRED_EDUCATION_NAME]: DEFAULT,
      [JOB_MID_CODE_NAME]: DEFAULT,
      [LOCATION_NAME]: DEFAULT,
      [ETC]: null,
    },
    mode: 'onBlur',
    resolver: zodResolver(userMetaFormSchema),
  });

  useEffect(() => {
    if (metaData) {
      reset({
        [EXPERIENCE_NAME]: metaData?.[EXPERIENCE_NAME] ?? DEFAULT,
        [REQUIRED_EDUCATION_NAME]: metaData?.[REQUIRED_EDUCATION_NAME] ?? DEFAULT,
        [JOB_MID_CODE_NAME]: metaData?.[JOB_MID_CODE_NAME] ?? DEFAULT,
        [LOCATION_NAME]: metaData?.[LOCATION_NAME] ?? DEFAULT,
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

  const handleOnSubmit = async (values: UserMetaDataType) => {
    try {
      await mutateAsync(values);
      if (isFirstTime) handleExperienceUp(FILL_OUT_META_DATA);
      Notify.success(isFirstTime ? CHARACTER_POST_SUCCESS_WITH_EXP : POST_DATA_SUCCESS);
      toggleModal(USER_META_DATA);
      queryClient.invalidateQueries({
        queryKey: [JOB_POSTING, userId],
        exact: true,
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    userId,
    watch,
    register,
    errors,
    handleSubmit,
    handleOnSubmit,
    handleSelect,
    isPending,
    isFirstTime,
  };
};
