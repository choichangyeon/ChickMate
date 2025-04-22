'use client';

import { Dispatch, SetStateAction } from 'react';
import Modal from '@/components/ui/modal';
import Typography from '@/components/ui/typography';
import { RESUME_MESSAGE } from '@/constants/message-constants';
import { QUERY_KEY } from '@/constants/query-key';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { showNotiflixConfirm } from '@/utils/show-notiflix-confirm';
import { useDeleteResumeMutation } from '@/features/resume/hooks/use-delete-resume-mutation';
import DraftResumeItem from '@/features/resume/draft-resume-item';
import type { Resume } from '@prisma/client';

const { CONFIRM } = RESUME_MESSAGE;
const { DRAFT_RESUME } = MODAL_ID;
const { RESUME_DRAFT } = QUERY_KEY;
const EMPTY_DRAFT_COUNT = 0;

type Props = {
  draftResumeList: Resume[] | undefined;
  isError: boolean;
  onLoadDraft: (resume: Resume) => void;
  activeResumeId: number | null;
  setResumeId: Dispatch<SetStateAction<number | null>>;
};

const DraftResumesModal = ({ draftResumeList, isError, onLoadDraft, activeResumeId, setResumeId }: Props) => {
  const { mutate: deleteResumeMutate } = useDeleteResumeMutation(RESUME_DRAFT);

  const handleDeleteResume = (resumeId: number) => {
    document.body.classList.add('confirm-open');
    showNotiflixConfirm({ message: CONFIRM.DELETE, okFunction: () => deleteResumeMutate(resumeId) });

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
      {!isError && draftResumeList?.length === EMPTY_DRAFT_COUNT ? (
        <Typography color='gray-500'>임시 저장된 자기소개서가 없습니다</Typography>
      ) : (
        <ul className='flex flex-col gap-4'>
          {draftResumeList?.map((resume) => {
            return (
              <DraftResumeItem
                key={resume.id}
                resume={resume}
                onDeleteClick={handleDeleteResume}
                onDraftResumeClick={handleDraftResumeClick}
              />
            );
          })}
        </ul>
      )}
    </Modal>
  );
};

export default DraftResumesModal;
