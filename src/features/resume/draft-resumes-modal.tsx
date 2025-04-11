'use client';

import { Dispatch, SetStateAction } from 'react';
import Modal from '@/components/ui/modal';
import Typography from '@/components/ui/typography';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { useDeleteResumeMutation } from '@/features/resume/hooks/use-delete-resume-mutation';
import type { Resume } from '@prisma/client';

type Props = {
  draftResumeList: Resume[] | undefined;
  isError: boolean;
  onLoadDraft: (resume: Resume) => void;
  activeResumeId: number | null;
  setResumeId: Dispatch<SetStateAction<number | null>>;
};

const DraftResumesModal = ({ draftResumeList, isError, onLoadDraft, activeResumeId, setResumeId }: Props) => {
  const { DRAFT_RESUME } = MODAL_ID;

  const { mutate: deleteResumeMutate } = useDeleteResumeMutation();

  const handleDeleteResume = (resumeId: number) => {
    deleteResumeMutate(resumeId);
    if (activeResumeId === resumeId) {
      setResumeId(null);
    }
  };

  const handleDraftResumeClick = (resume: Resume) => {
    onLoadDraft(resume);
  };

  return (
    <Modal modalId={DRAFT_RESUME} className='flex flex-col gap-2'>
      {!isError && draftResumeList?.length === 0 ? (
        <Typography>임시 저장된 자기소개서가 없습니다</Typography>
      ) : (
        draftResumeList?.map((resume) => (
          <div key={resume.id} className='flex gap-3'>
            <button onClick={() => handleDraftResumeClick(resume)}>{resume.title}</button>
            <button onClick={() => handleDeleteResume(resume.id)} className='bg-red-300'>
              삭제
            </button>
          </div>
        ))
      )}
    </Modal>
  );
};

export default DraftResumesModal;
