'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useResumeForm } from '@/features/resume/hooks/use-resume-form';
import QuestionAnswerField from '@/features/resume/question-answer-field';
import { draftResumeOptions } from '@/features/resume/data/draft-resume-options';

const ResumeForm = () => {
  const { title, fieldList, handleTitleChange, handleFieldChange, handleAddField, handleDeleteField, handleSubmit } =
    useResumeForm();

  const { data: draftResumeList } = useSuspenseQuery(draftResumeOptions);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      <input type='text' value={title} onChange={handleTitleChange} placeholder='제목을 입력해주세요.' required />
      {fieldList.map((field) => {
        return (
          <QuestionAnswerField key={field.id} field={field} onChange={handleFieldChange} onDelete={handleDeleteField} />
        );
      })}
      <button type='button' onClick={handleAddField}>
        추가하기
      </button>
      <button type='button'>임시 저장된 글 | {draftResumeList.length}</button>
      <button type='submit'>작성 완료</button>
    </form>
  );
};

export default ResumeForm;
