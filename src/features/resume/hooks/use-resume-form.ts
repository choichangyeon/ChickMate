import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';
import { DELAY_TIME } from '@/constants/time-constants';
import { AUTO_SAVE_STATUS } from '@/constants/resume-constants';
import { defaultQuestionList } from '@/features/resume/data/default-question-list';
import { usePreventPageUnload } from '@/features/resume/hooks/use-prevent-page-load';
import { autoSaveResume, submitResume } from '@/features/resume/api/client-services';
import useDebounce from '@/hooks/customs/use-debounce';
import type { Field } from '@/types/resume';
import type { Resume } from '@prisma/client';

const { MY_PAGE } = PATH;
const { DEFAULT } = DELAY_TIME;
const { SAVING, SAVED } = AUTO_SAVE_STATUS;

export const useResumeForm = (resume?: Resume) => {
  const router = useRouter();

  /** state */
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(resume?.title || '');
  const [fieldList, setFieldList] = useState<Field[]>((resume?.content as Field[]) || defaultQuestionList);
  const [resumeId, setResumeId] = useState<number | null>(resume?.id || null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>(SAVING);

  /** function */
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsDirty(true);
    setAutoSaveStatus(SAVING);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { id, name, value } = event.target;
    setFieldList((prev) => prev.map((field) => (field.id === id ? { ...field, [name]: value } : field)));
    setIsDirty(true);
    setAutoSaveStatus(SAVING);
  };

  const handleAddField = () => {
    if (fieldList.length >= 5) {
      // 수정해야되는 alert창
      alert('자기소개서 항목은 최대 5개까지 추가할 수 있습니다.');
      return;
    }
    setFieldList((prev) => [...prev, { id: crypto.randomUUID(), question: '', answer: '' }]);
    setAutoSaveStatus(SAVING);
  };

  const handleDeleteField = (fieldId: string) => {
    if (fieldList.length <= 1) {
      // 수정해야되는 alert창
      alert('자기소개서 항목은 최소 1개 이상 작성해야됩니다.');
      return;
    }
    setFieldList((prev) => prev.filter((field) => field.id !== fieldId));
    setAutoSaveStatus(SAVING);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = { title, fieldList };
      await submitResume({ resumeId, data });

      // 수정해야되는 alert창
      alert('자기소개서 작성이 완료되었습니다.');
      router.push(MY_PAGE);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
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

  return {
    title,
    fieldList,
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
