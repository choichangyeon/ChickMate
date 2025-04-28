'use client';

import Typography from '@/components/ui/typography';
import { Session } from 'next-auth';
import ResumeAllModal from '@/features/interview/resume-all-modal';
import { useModalStore } from '@/store/use-modal-store';
import { MODAL_ID } from '@/constants/modal-id-constants';
import Modal from '@/components/ui/modal';

const { COMPLETED_RESUME } = MODAL_ID;

type Props = {
  session: Session | null;
};

const ResumeAllButton = ({ session }: Props) => {
  const toggleModal = useModalStore((state) => state.toggleModal);
  const isModalOpen = useModalStore((state) => state.getIsModalOpen(COMPLETED_RESUME));

  if (!session) return null;

  return (
    <>
      <button
        onClick={(event) => {
          event.preventDefault();
          toggleModal(COMPLETED_RESUME);
        }}
      >
        <Typography color='gray-500'>전체보기</Typography>
      </button>
      {isModalOpen && (
        <Modal modalId={COMPLETED_RESUME}>
          <ResumeAllModal />
        </Modal>
      )}
    </>
  );
};

export default ResumeAllButton;
