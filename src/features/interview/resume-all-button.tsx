'use client';

import Typography from '@/components/ui/typography';
import { Session } from 'next-auth';
import ResumeAllModal from '@/features/interview/resume-all-modal';
import { useModalStore } from '@/store/use-modal-store';
import { MODAL_ID } from '@/constants/modal-id-constants';
import Modal from '@/components/ui/modal';

const { ALL_RESUME_LIST } = MODAL_ID;

type Props = {
  session: Session | null;
};

const ResumeAllButton = ({ session }: Props) => {
  const toggleModal = useModalStore((state) => state.toggleModal);
  const isModalOpen = useModalStore((state) => state.getIsModalOpen(ALL_RESUME_LIST));

  if (!session) return null;

  return (
    <>
      <button
        onClick={(event) => {
          event.preventDefault();
          toggleModal(ALL_RESUME_LIST);
        }}
      >
        <span className='mobile:hidden'>
          <Typography size='sm' color='gray-500'>
            전체보기
          </Typography>
        </span>
        <span className='hidden mobile:flex mobile:whitespace-nowrap'>
          <Typography size='xs' color='gray-500'>
            전체보기
          </Typography>
        </span>
      </button>
      {isModalOpen && (
        <Modal modalId={ALL_RESUME_LIST}>
          <ResumeAllModal />
        </Modal>
      )}
    </>
  );
};

export default ResumeAllButton;
