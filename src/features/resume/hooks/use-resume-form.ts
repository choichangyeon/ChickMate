import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';
import { defaultQuestionList } from '@/features/resume/data/default-question-list';
import { usePreventPageUnload } from '@/features/resume/hooks/use-prevent-page-load';
import { postResumeField } from '@/features/resume/api/client-service';
import type { Field } from '@/types/resume';

export const useResumeForm = () => {
  const router = useRouter();

  const { MY_PAGE } = PATH;

  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [fieldList, setFieldList] = useState<Field[]>(defaultQuestionList);

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

    const data = { title, fieldList };
    await postResumeField({ data });

    // 임시로 넣어둔 alert창
    alert('자기소개서 작성이 완료되었습니다.');
    router.push(MY_PAGE);
  };

  usePreventPageUnload(isDirty);

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
