import { Dispatch, SetStateAction } from 'react';
import Modal from '@/components/common/modal';
import Text from '@/components/ui/text';
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
    <Modal className='flex flex-col gap-2'>
      {!isError && draftResumeList?.length === 0 ? (
        <Text>임시 저장된 자기소개서가 없습니다</Text>
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
