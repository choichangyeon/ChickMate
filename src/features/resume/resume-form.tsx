'use client';

import QuestionAnswerField from '@/features/resume/question-answer-field';
import { useResumeForm } from './hooks/use-resume-form';

const ResumeForm = () => {
  const { title, fieldList, handleTitleChange, handleFieldChange, handleAddField, handleDeleteField, handleSubmit } =
    useResumeForm();

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      <input type='text' value={title} onChange={handleTitleChange} placeholder='제목을 입력해주세요.' />
      {fieldList.map((field) => {
        return (
          <QuestionAnswerField key={field.id} field={field} onChange={handleFieldChange} onDelete={handleDeleteField} />
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
