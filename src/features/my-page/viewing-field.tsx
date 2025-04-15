'use client';
import Modal from '@/components/ui/modal';
import { useModalStore } from '@/store/use-modal-store';
import { MODAL_ID } from '@/constants/modal-id-constants';
import UserMetaDataModal from '@/features/user-meta-data/user-meta-data-modal';
import MyPageCharacter from '../character/my-page-character';
import { Session } from 'next-auth';

type Props = {
  session: Session;
};

const { USER_META_DATA } = MODAL_ID;

const ViewingField = ({ session }: Props) => {
  const toggleModal = useModalStore((state) => state.toggleModal);
  const isModalOpen = useModalStore((state) => state.getIsModalOpen(USER_META_DATA));

  return (
    <section className='h-[80dvh] w-1/2 border-2'>
      <div className='flex w-full items-center justify-center'>
        <MyPageCharacter session={session} />
      </div>
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
