'use client';

import { useResumeForm } from '@/features/resume/hooks/use-resume-form';
import { useDraftResumesQuery } from '@/features/resume/hooks/use-draft-resumes-query';
import QuestionAnswerField from '@/features/resume/question-answer-field';
import Text from '@/components/ui/text';

const ResumeForm = () => {
  const {
    title,
    fieldList,
    autoSaveStatus,
    handleTitleChange,
    handleFieldChange,
    handleAddField,
    handleDeleteField,
    handleSubmit,
  } = useResumeForm();

  const { data: draftResumeList } = useDraftResumesQuery();

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
      <Text>{autoSaveStatus}</Text>
      <button type='button'>임시 저장된 글 | {draftResumeList?.length}</button>
      <button type='submit'>작성 완료</button>
    </form>
  );
};

export default ResumeForm;
