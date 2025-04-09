'use client';

import Text from '@/components/ui/text';
import Modal from '@/components/ui/modal';
import { useModal } from '@/hooks/customs/use-modal';
import { useResumeForm } from '@/features/resume/hooks/use-resume-form';
import { useDraftResumesQuery } from '@/features/resume/hooks/use-draft-resumes-query';
import QuestionAnswerField from '@/features/resume/question-answer-field';
import type { Field } from '@/types/resume';

const ResumeForm = () => {
  /** hook */
  const {
    title,
    fieldList,
    autoSaveStatus,
    setTitle,
    setFieldList,
    setResumeId,
    handleTitleChange,
    handleFieldChange,
    handleAddField,
    handleDeleteField,
    handleSubmit,
  } = useResumeForm();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: draftResumeList, isError, refetch } = useDraftResumesQuery();

  /** function */
  const handleClose = () => {
    closeModal();
  };

  const handleClick = () => {
    openModal();
    refetch();
  };

  /** UI */
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
      <button type='button' onClick={handleClick}>
        임시 저장된 글 | {draftResumeList?.length ?? 0}
      </button>

      {isModalOpen && (
        <Modal closeModal={handleClose}>
          <div className='flex flex-col gap-3'>
            {!isError && draftResumeList?.length === 0 ? (
              <Text>임시 저장된 자기소개서가 없습니다</Text>
            ) : (
              draftResumeList?.map((resume) => {
                const { id, title, content } = resume;

                const handleLoadDraft = () => {
                  setTitle(title);
                  setFieldList(content as Field[]);
                  setResumeId(id);
                  closeModal();
                };

                return (
                  <button key={resume.id} onClick={handleLoadDraft}>
                    {resume.title}
                  </button>
                );
              })
            )}
          </div>
        </Modal>
      )}
      <button type='submit'>작성 완료</button>
    </form>
  );
};

export default ResumeForm;
