'use client';
import Modal from '@/components/ui/modal';
import Typography from '@/components/ui/typography';
import { useModalStore } from '@/store/use-modal-store';
import { MODAL_ID } from '@/constants/modal-id-constants';
import UserMetaDataModal from '@/features/user-meta-data/user-meta-data-modal';

const { USER_META_DATA } = MODAL_ID;

const ViewingField = () => {
  const toggleModal = useModalStore((state) => state.toggleModal);
  const isModalOpen = useModalStore((state) => state.getIsModalOpen(USER_META_DATA));

  return (
    <section className='text- w-1/2 border-2'>
      <Typography as='h3'>삐약이카드</Typography>
      <button onClick={() => toggleModal(USER_META_DATA)}>모달열자</button>
      {isModalOpen && (
        <Modal modalId={USER_META_DATA}>
          <UserMetaDataModal />
        </Modal>
      )}
    </section>
  );
};

export default ViewingField;
