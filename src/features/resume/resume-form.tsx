'use client';

import { useState } from 'react';
import QuestionAnswerField from '@/features/resume/question-answer-field';
import { defaultQuestionList } from '@/features/resume/data/default-question-list';
import type { Field } from '@/types/resume';
import { usePreventPageUnload } from './hooks/use-prevent-page-load';

const ResumeForm = () => {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [fieldList, setFieldList] = useState<Field[]>(defaultQuestionList);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, name, value } = e.target;
    setFieldList((prev) => prev.map((field) => (field.id === Number(id) ? { ...field, [name]: value } : field)));
    setIsDirty(true);
  };

  const handleAddField = () => {
    setFieldList((prev) => [...prev, { id: Date.now(), question: '', answer: '' }]);
  };

  const handleDeleteField = (fieldId: number) => {
    setFieldList((prev) => prev.filter((field) => field.id !== fieldId));
  };

  usePreventPageUnload(isDirty);

  return (
    <form className='flex flex-col gap-8'>
      {fieldList.map((field) => {
        return (
          <QuestionAnswerField key={field.id} field={field} onChange={handleChange} onDelete={handleDeleteField} />
        );
      })}
      <button type='button' onClick={handleAddField}>
        추가하기
      </button>
      <button type='submit'>작성 완료</button>
    </form>
  );
};

export default ResumeForm;
