'use client';
import BlockComponent from '@/components/common/block-component';
import ErrorComponent from '@/components/common/error-component';
import LoadingSpinner from '@/components/ui/loading-spinner';
import Modal from '@/components/ui/modal';
import Typography from '@/components/ui/typography';
import { MODAL_ID } from '@/constants/modal-id-constants';
import MyInfoContent from '@/features/my-page/my-info-content';
import { useMetaDataQuery } from '@/features/user-meta-data/hooks/use-meta-data-query';
import UserMetaDataModal from '@/features/user-meta-data/user-meta-data-modal';
import { useModalStore } from '@/store/use-modal-store';
import { Session } from 'next-auth';

type Props = {
  session: Session;
};

const { USER_META_DATA } = MODAL_ID;

const MyInfo = ({ session }: Props) => {
  const { data, isPending, isError } = useMetaDataQuery({ userId: session.user.id });

  const toggleModal = useModalStore((state) => state.toggleModal);
  const isModalOpen = useModalStore((state) => state.getIsModalOpen(USER_META_DATA));

  if (isPending)
    return (
      <div className='flex flex-1 items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return (
      <div className='flex flex-1 items-center justify-center'>
        <ErrorComponent />
      </div>
    );

  return (
    <section className='flex flex-1 flex-col gap-4'>
      <Typography as='h2' size='2xl' weight='bold'>
        <span className='text-primary-orange-600'>내 정보</span> 확인
      </Typography>
      {!data ? (
        <div className='flex flex-1 items-center justify-center'>
          <BlockComponent
            firstLine='이런! 내 정보가 없어요!'
            secondLine='내 정보를 등록해볼까요?'
            thirdLine='ChickMate와 함께 성장해요.'
            buttonName='내 정보 등록하기'
            onClick={() => toggleModal(USER_META_DATA)}
          />
        </div>
      ) : (
        <MyInfoContent data={data} />
      )}
      {isModalOpen && (
        <Modal modalId={USER_META_DATA}>
          <UserMetaDataModal />
        </Modal>
      )}
    </section>
  );
};

export default MyInfo;
