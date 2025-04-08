import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';
import { DELAY_TIME } from '@/constants/time-constants';
import { defaultQuestionList } from '@/features/resume/data/default-question-list';
import { usePreventPageUnload } from '@/features/resume/hooks/use-prevent-page-load';
import { autoSaveResume, submitResume } from '@/features/resume/api/client-service';
import useDebounce from '@/hooks/customs/use-debounce';
import type { Field } from '@/types/resume';

export const useResumeForm = () => {
  const router = useRouter();

  /** constant */
  const { MY_PAGE } = PATH;
  const { DEFAULT } = DELAY_TIME;

  /** state */
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [fieldList, setFieldList] = useState<Field[]>(defaultQuestionList);
  const [resumeId, setResumeId] = useState<number>(null);

  /** function */
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsDirty(true);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, name, value } = event.target;
    setFieldList((prev) => prev.map((field) => (field.id === id ? { ...field, [name]: value } : field)));
    setIsDirty(true);
  };

  const handleAddField = () => {
    if (fieldList.length >= 5) {
      // 수정해야되는 alert창
      alert('자기소개서 항목은 최대 5개까지 추가할 수 있습니다.');
      return;
    }
    setFieldList((prev) => [...prev, { id: crypto.randomUUID(), question: '', answer: '' }]);
  };

  const handleDeleteField = (fieldId: string) => {
    if (fieldList.length <= 1) {
      // 수정해야되는 alert창
      alert('자기소개서 항목은 최소 1개 이상 작성해야됩니다.');
      return;
    }
    setFieldList((prev) => prev.filter((field) => field.id !== fieldId));
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
      alert(error.message);
    }
  };

  usePreventPageUnload(isDirty);

  /** 자동 저장 */
  const debouncedTitle = useDebounce(title, DEFAULT);
  const debouncedFieldList = useDebounce(fieldList, DEFAULT);

  useEffect(() => {
    if (!isDirty) return;

    const data = { title: debouncedTitle, fieldList: debouncedFieldList };

    autoSaveResume({ resumeId, data }).then((savedResumeId) => {
      if (resumeId === null) {
        setResumeId(savedResumeId);
      }
    });
  }, [debouncedTitle, debouncedFieldList]);

  return {
    title,
    fieldList,
    handleTitleChange,
    handleFieldChange,
    handleAddField,
    handleDeleteField,
    handleSubmit,
  };
};
