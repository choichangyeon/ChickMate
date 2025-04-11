'use client';

import { useEffect } from 'react';
import Typography from '@/components/ui/typography';
import { useModalStore } from '@/store/use-modal-store';
import { useResumeForm } from '@/features/resume/hooks/use-resume-form';
import { useDraftResumesQuery } from '@/features/resume/hooks/use-draft-resumes-query';
import QuestionAnswerField from '@/features/resume/question-answer-field';
import DraftResumesModal from '@/features/resume/draft-resumes-modal';
import type { Field } from '@/types/resume';
import type { Resume } from '@prisma/client';

const ResumeForm = () => {
  const toggleModal = useModalStore((state) => state.toggleModal);
  const isModalOpen = useModalStore((state) => state.isModalOpen);

  /** hook */
  const {
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
  } = useResumeForm();

  const { data: draftResumeList, isError, refetch } = useDraftResumesQuery();

  /** function */
  const handleDraftResumeListClick = () => {
    toggleModal();
    refetch();
  };

  const handleLoadDraft = (resume: Resume) => {
    const { id, title, content } = resume;

    setTitle(title);
    setFieldList(content as Field[]);
    setResumeId(id);
    toggleModal();
  };

  useEffect(() => {
    refetch();
  }, []);

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
      <Typography>{autoSaveStatus}</Typography>
      <button type='button' onClick={handleDraftResumeListClick}>
        임시 저장된 글 | {draftResumeList?.length ?? 0}
      </button>

      {isModalOpen && (
        <DraftResumesModal
          draftResumeList={draftResumeList}
          isError={isError}
          onLoadDraft={handleLoadDraft}
          activeResumeId={resumeId}
          setResumeId={setResumeId}
        />
      )}
      <button type='submit'>작성 완료</button>
    </form>
  );
};

export default ResumeForm;
