'use client';

import { useState } from 'react';
import QuestionAnswerField from '@/features/resume/question-answer-field';
import { defaultQuestionList } from '@/features/resume/data/default-question-list';
import { usePreventPageUnload } from './hooks/use-prevent-page-load';
import { postResumeField } from '@/features/resume/api/client-service';
import type { Field } from '@/types/resume';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';

const ResumeForm = () => {
  const router = useRouter();
  const { MY_PAGE } = PATH;

  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [fieldList, setFieldList] = useState<Field[]>(defaultQuestionList);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, name, value } = e.target;
    setFieldList((prev) => prev.map((field) => (field.id === id ? { ...field, [name]: value } : field)));
    setIsDirty(true);
  };

  const handleAddField = () => {
    setFieldList((prev) => [...prev, { id: crypto.randomUUID(), question: '', answer: '' }]);
  };

  const handleDeleteField = (fieldId: string) => {
    setFieldList((prev) => prev.filter((field) => field.id !== fieldId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { title, fieldList };
    postResumeField({ data });

    // 임시로 넣어둔 alert창
    alert('자기소개서 작성이 완료되었습니다.');
    router.push(MY_PAGE);
  };

  usePreventPageUnload(isDirty);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='자기소개서 제목을 입력해주세요.'
      />
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
