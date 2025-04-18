'use client';

import { Dispatch, SetStateAction } from 'react';
import Modal from '@/components/ui/modal';
import Typography from '@/components/ui/typography';
import type { Resume } from '@prisma/client';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { useDeleteResumeMutation } from '@/features/resume/hooks/use-delete-resume-mutation';
import Trash from '@/components/icons/trash';
import { formatDate } from '@/utils/format-date';

const { DRAFT_RESUME } = MODAL_ID;

type Props = {
  draftResumeList: Resume[] | undefined;
  isError: boolean;
  onLoadDraft: (resume: Resume) => void;
  activeResumeId: number | null;
  setResumeId: Dispatch<SetStateAction<number | null>>;
};

const DraftResumesModal = ({ draftResumeList, isError, onLoadDraft, activeResumeId, setResumeId }: Props) => {
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
    <Modal modalId={DRAFT_RESUME} className='flex flex-col gap-4'>
      <div>
        <Typography as='h2' size='2xl' weight='bold' align='center'>
          임시 저장된 자소서
        </Typography>
        <Typography color='primary-600' weight='bold' align='center'>
          작성 완료 시 300 경험치 획득!
        </Typography>
      </div>
      {!isError && draftResumeList?.length === 0 ? (
        <Typography>임시 저장된 자기소개서가 없습니다</Typography>
      ) : (
        <ul className='flex flex-col gap-4'>
          {draftResumeList?.map((resume) => {
            return (
              <li key={resume.id} className='flex flex-col'>
                <div className='flex justify-between'>
                  <Typography color='gray-500'>{formatDate({ input: resume.createdAt })}</Typography>
                  <button onClick={() => handleDeleteResume(resume.id)}>
                    <Trash />
                  </button>
                </div>
                <button
                  className='text-left font-bold text-cool-gray-900'
                  onClick={() => handleDraftResumeClick(resume)}
                >
                  {resume.title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
};

export default DraftResumesModal;
