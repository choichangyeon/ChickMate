'use client';

import Typography from '@/components/ui/typography';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { useModalStore } from '@/store/use-modal-store';
import UserMetaDataModal from '@/features/user-meta-data/user-meta-data-modal';
import Modal from '@/components/ui/modal';
import { Session } from 'next-auth';
import SettingFill from '@/components/icons/setting-fill';
import { useMetaDataQuery } from '@/features/user-meta-data/hooks/use-meta-data-query';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import BlockComponent from '@/components/common/block-component';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import LoadingSpinner from '@/components/ui/loading-spinner';
import ErrorComponent from '@/components/common/error-component';

type Props = {
  session: Session;
};

type FieldList = {
  key: keyof UserMetaDataType;
  label: string;
};

const { USER_META_DATA } = MODAL_ID;

const { EXPERIENCE_NAME, REQUIRED_EDUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;

const fieldList: FieldList[] = [
  { key: EXPERIENCE_NAME, label: '경력' },
  { key: REQUIRED_EDUCATION_NAME, label: '학력' },
  { key: JOB_MID_CODE_NAME, label: '직무' },
  { key: LOCATION_NAME, label: '지역' },
  { key: ETC, label: '기타' },
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
    <div className='flex flex-1 flex-col gap-4'>
      <div className='flex justify-between'>
        <Typography as='h2' size='2xl' weight='bold'>
          <span className='text-primary-orange-600'>내 정보</span> 확인
        </Typography>
        <button onClick={() => toggleModal(USER_META_DATA)}>
          <SettingFill />
        </button>
      </div>
      {/* 높이 조정 필요 */}
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
        <ul>
          {fieldList.map(({ key, label }) => (
            <li key={key} className='flex gap-4 rounded-2xl p-4'>
              <Typography size='md' as='h3' weight='bold' color='secondary-amber'>
                {label}
              </Typography>
              <Typography>{data[key]}</Typography>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && (
        <Modal modalId={USER_META_DATA}>
          <UserMetaDataModal />
        </Modal>
      )}
    </div>
  );
};

export default MyInfo;
