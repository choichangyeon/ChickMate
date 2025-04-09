import Modal from '@/components/ui/modal';
import Text from '@/components/ui/text';
import type { Resume } from '@prisma/client';

type Props = {
  draftResumeList: Resume[];
  isError: boolean;
  onLoadDraft: (resume: Resume) => void;
  onClose: () => void;
};

const DraftResumeListModal = ({ draftResumeList, isError, onLoadDraft, onClose }: Props) => {
  return (
    <Modal closeModal={onClose}>
      <div className='flex flex-col gap-3'>
        {!isError && draftResumeList?.length === 0 ? (
          <Text>임시 저장된 자기소개서가 없습니다</Text>
        ) : (
          draftResumeList?.map((resume) => {
            return (
              <button key={resume.id} onClick={() => onLoadDraft(resume)}>
                {resume.title}
              </button>
            );
          })
        )}
      </div>
    </Modal>
  );
};

export default DraftResumeListModal;
