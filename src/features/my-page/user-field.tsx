'use client';
import React from 'react';
import Modal from '@/components/common/modal';
import UserMetaDataModal from '@/features/user-meta-data/user-meta-data-modal';
import { useModalStore } from '@/store/use-modal-store';
import Typography from '@/components/ui/typography';

const UserField = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const toggleModal = useModalStore((state) => state.toggleModal);

  return (
    <section className='text- w-1/2 border-2'>
      <Typography as='h3'>삐약이카드</Typography>
      <button onClick={toggleModal}>모달열자</button>
      {isModalOpen && (
        <Modal>
          <UserMetaDataModal />
        </Modal>
      )}
    </section>
  );
};

export default UserField;
