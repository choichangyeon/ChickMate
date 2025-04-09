import Modal from '@/components/ui/modal';
import Text from '@/components/ui/text';
import type { Resume } from '@prisma/client';
import { useDeleteResumeMutation } from './hooks/use-delete-resume-mutation';

type Props = {
  draftResumeList: Resume[];
  isError: boolean;
  onLoadDraft: (resume: Resume) => void;
  onClose: () => void;
};

const DraftResumesModal = ({ draftResumeList, isError, onLoadDraft, onClose }: Props) => {
  const { mutate: deleteResumeMutate } = useDeleteResumeMutation();

  const handleDeleteResume = (resumeId: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    deleteResumeMutate(resumeId);
  };

  return (
    <Modal closeModal={onClose}>
      <div className='flex flex-col gap-3'>
        {!isError && draftResumeList?.length === 0 ? (
          <Text>임시 저장된 자기소개서가 없습니다</Text>
        ) : (
          draftResumeList?.map((resume) => {
            const handleDraftResumeClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              event.stopPropagation();
              onLoadDraft(resume);
            };

            return (
              <div key={resume.id} className='flex gap-3'>
                <button onClick={handleDraftResumeClick}>{resume.title}</button>
                <button onClick={(event) => handleDeleteResume(resume.id, event)} className='bg-red-300'>
                  삭제
                </button>
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
};

export default DraftResumesModal;
