'use client';
import { useEffect, useState } from 'react';
import QuestionAnswerField from '@/features/resume/question-answer-field';
import { defaultQuestionList } from '@/features/resume/data/default-question-list';
import type { Field } from '@/types/resume';

const ResumeForm = () => {
  const STORAGE_KEY = 'resumeFields';

  const [fieldList, setFieldList] = useState<Field[]>(
    defaultQuestionList.map((question) => ({
      id: question.id,
      question: question.questionText,
      answer: '',
    }))
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, name, value } = e.target;
    setFieldList((prev) => prev.map((field) => (field.id === Number(id) ? { ...field, [name]: value } : field)));
  };

  const handleAddField = () => {
    setFieldList((prev) => [...prev, { id: Date.now(), question: '', answer: '' }]);
  };

  const handleDeleteField = (fieldId: number) => {
    setFieldList((prev) => prev.filter((field) => field.id !== fieldId));
  };

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
