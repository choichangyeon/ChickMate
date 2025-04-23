'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';
import { PATH } from '@/constants/path-constant';
import { DELAY_TIME } from '@/constants/time-constants';
import { AUTO_SAVE_STATUS } from '@/constants/resume-constants';
import { RESUME_MESSAGE } from '@/constants/message-constants';
import useDebounce from '@/hooks/customs/use-debounce';
import { autoSaveResume, getCheckToGetEXP } from '@/features/resume/api/client-services';
import { usePreventPageUnload } from '@/features/resume/hooks/use-prevent-page-load';
import { useCharacterStore } from '@/store/use-character-store';
import { useExperienceUp } from '@/features/character/hooks/use-experience-up';
import { defaultQuestionList } from '@/features/resume/data/default-question-list';
import { useAddResumeMutation } from '@/features/resume/hooks/use-add-resume-mutation';
import { CHARACTER_HISTORY_KEY } from '@/constants/character-constants';
import type { Field } from '@/types/resume';
import type { ResumeType } from '@/types/DTO/resume-dto';
import { useTabStore } from '@/store/use-tab-store';
import { TABS } from '@/constants/my-page-constants';

const { MY_PAGE } = PATH;
const { DEFAULT } = DELAY_TIME;
const { SAVING, SAVED } = AUTO_SAVE_STATUS;
const { RESUME_SUBMISSION } = CHARACTER_HISTORY_KEY;
const { RESUME } = TABS;

export const useResumeForm = (resume?: ResumeType) => {
  const router = useRouter();
  const characterId = useCharacterStore((state) => state.characterId);
  const setTab = useTabStore((state) => state.setTab);
  const { handleExperienceUp } = useExperienceUp();

  const { mutateAsync: addResumeMutateAsync } = useAddResumeMutation();

  /** state */
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(resume?.title || '');
  const [fieldList, setFieldList] = useState<Field[]>((resume?.content as Field[]) || defaultQuestionList);
  const [resumeId, setResumeId] = useState<number | null>(resume?.id || null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>(SAVING);

  const {
    SUBMIT: { SUCCESS_WITH_EXP, SUCCESS },
  } = RESUME_MESSAGE;

  /** function */
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsDirty(true);
    setAutoSaveStatus(SAVING);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { id, name, value } = event.target;
    const [, ...realId] = id.split('-');

    setFieldList((prev) => prev.map((field) => (field.id === realId.join('-') ? { ...field, [name]: value } : field)));
    setIsDirty(true);
    setAutoSaveStatus(SAVING);
  };

  const handleAddField = () => {
    setFieldList((prev) => [...prev, { id: crypto.randomUUID(), question: '', answer: '' }]);
    setAutoSaveStatus(SAVING);
  };

  const handleDeleteField = (fieldId: string) => {
    setFieldList((prev) => prev.filter((field) => field.id !== fieldId));
    setAutoSaveStatus(SAVING);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = { title, fieldList };

      await addResumeMutateAsync({ resumeId, data });

      const isAbleToGetEXP = await getCheckToGetEXP(); // 오늘 작성한 자소서 개수 체크 -> 3개 이하 -> 경험치 획득 가능
      const isReqExp = characterId;
      if (isReqExp) {
        if (isAbleToGetEXP) handleExperienceUp(RESUME_SUBMISSION);
      }

      Notify.success(isReqExp && isAbleToGetEXP ? SUCCESS_WITH_EXP : SUCCESS);

      // TODO: 이동하기 전 zustand를 통해 마이페이지의 탭 자기소개서 선택되도록      setTab(RESUME);
      router.push(MY_PAGE);
    } catch (error) {
      if (error instanceof Error) {
        Notify.warning(error.message);
      }
    }
  };

  usePreventPageUnload(isDirty);

  /** 자동 저장 */
  const debouncedTitle = useDebounce(title, DEFAULT);
  const debouncedFieldList = useDebounce(fieldList, DEFAULT);

  useEffect(() => {
    if (!isDirty) return;
    setAutoSaveStatus(SAVING);

    const data = { title: debouncedTitle, fieldList: debouncedFieldList };
    autoSaveResume({ resumeId, data }).then((savedResumeId) => {
      setAutoSaveStatus(SAVED);

      if (resumeId === null) {
        setResumeId(savedResumeId);
      }
    });
  }, [debouncedTitle, debouncedFieldList]);

  const fieldListLen = fieldList.length;

  return {
    title,
    fieldList,
    fieldListLen,
    autoSaveStatus,
    resumeId,
    setTitle,
    setFieldList,
    setResumeId,
    handleTitleChange,
    handleFieldChange,
    handleAddField,
    handleDeleteField,
    handleSubmit,
  };
};
