'use client';
import { Session } from 'next-auth';
import { useMetaDataQuery } from '@/features/user-meta-data/hooks/use-meta-data-query';
import UserMetaDataModal from '@/features/user-meta-data/user-meta-data-modal';
import MyInfoContent from '@/features/my-page/my-info-content';
import BlockComponent from '@/components/common/block-component';
import ErrorComponent from '@/components/common/error-component';
import LoadingSpinner from '@/components/ui/loading-spinner';
import Modal from '@/components/ui/modal';
import Typography from '@/components/ui/typography';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { useModalStore } from '@/store/use-modal-store';
import type { UserMetaDataType } from '@/types/user-meta-data-type';

type Props = {
  session: Session;
};

export type FieldList = {
  key: keyof UserMetaDataType;
  label: string;
};

const { USER_META_DATA } = MODAL_ID;

const { EXPERIENCE_NAME, REQUIRED_EDUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;

const fieldList: FieldList[] = [
  { key: EXPERIENCE_NAME, label: '관련 경력' },
  { key: REQUIRED_EDUCATION_NAME, label: '최종 학력' },
  { key: JOB_MID_CODE_NAME, label: '지원 직무' },
  { key: LOCATION_NAME, label: '근무 지역' },
  { key: ETC, label: '기타 커리어' },
];

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
        <MyInfoContent fieldList={fieldList} data={data} />
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
