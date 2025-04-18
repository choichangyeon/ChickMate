'use client';

import { useEffect } from 'react';
import Typography from '@/components/ui/typography';
import Button from '@/components/ui/button';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { useModalStore } from '@/store/use-modal-store';
import { useResumeForm } from '@/features/resume/hooks/use-resume-form';
import { useDraftResumesQuery } from '@/features/resume/hooks/use-draft-resumes-query';
import QuestionAnswerField from '@/features/resume/question-answer-field';
import DraftResumesModal from '@/features/resume/draft-resumes-modal';
import type { Field, ResumeData } from '@/types/resume';
import type { Resume } from '@prisma/client';
import ResumeFormActionButton from './resume-form-action-button';

const { DRAFT_RESUME } = MODAL_ID;

type Props = {
  resume?: Resume;
};

const ResumeForm = ({ resume }: Props) => {
  const toggleModal = useModalStore((state) => state.toggleModal);
  const isModalOpen = useModalStore((state) => state.getIsModalOpen(DRAFT_RESUME));

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
  } = useResumeForm(resume);

  const { data: draftResumeList, isError, refetch } = useDraftResumesQuery();

  /** function */
  const handleDraftResumeListClick = () => {
    toggleModal(DRAFT_RESUME);
    refetch();
  };

  const handleLoadDraft = (resume: Resume) => {
    const { id, title, content } = resume;

    setTitle(title);
    setFieldList(content as Field[]);
    setResumeId(id);
    toggleModal(DRAFT_RESUME);
  };

  useEffect(() => {
    refetch();
  }, []);

  /** UI */
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='relative w-full'>
        <input
          type='text'
          value={title}
          onChange={handleTitleChange}
          placeholder='자소서 제목을 작성해주세요.'
          required
          className='h-[64px] w-full rounded-lg border border-cool-gray-200 px-8 py-4 pr-52 text-xl font-bold placeholder-cool-gray-300 focus:outline-none'
        />
        <button
          type='button'
          onClick={handleAddField}
          className='absolute right-4 top-1/2 w-[174px] -translate-y-1/2 rounded-3xl border border-cool-gray-900 bg-transparent px-5 py-1 font-bold text-cool-gray-900'
        >
          질문 추가 +
        </button>
      </div>

      {fieldList.map((field) => {
        return (
          <QuestionAnswerField key={field.id} field={field} onChange={handleFieldChange} onDelete={handleDeleteField} />
        );
      })}

      {/** 버튼 */}
      <ResumeFormActionButton
        resume={resume}
        draftResumeList={draftResumeList}
        autoSaveStatus={autoSaveStatus}
        onClick={handleDraftResumeListClick}
      />

      {/** 모달 */}
      {isModalOpen && (
        <DraftResumesModal
          draftResumeList={draftResumeList}
          isError={isError}
          onLoadDraft={handleLoadDraft}
          activeResumeId={resumeId}
          setResumeId={setResumeId}
        />
      )}
    </form>
  );
};

export default ResumeForm;
