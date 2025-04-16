'use client';

import Typography from '@/components/ui/typography';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { useModalStore } from '@/store/use-modal-store';
import UserMetaDataModal from '@/features/user-meta-data/user-meta-data-modal';
import Modal from '@/components/ui/modal';
import { Session } from 'next-auth';
import SettingFill from '@/components/icons/setting-fill';
import { UseMetaDataQuery } from '../user-meta-data/hooks/use-meta-data-query';
import { UserMetaDataType } from '@/types/user-meta-data-type';
import BlockComponent from '@/components/common/block-component';

type Props = {
  session: Session;
};

type FieldList = {
  key: keyof UserMetaDataType;
  label: string;
};

const { USER_META_DATA } = MODAL_ID;

const fieldList: FieldList[] = [
  { key: 'experienceType', label: '경력' },
  { key: 'educationLevel', label: '학력' },
  { key: 'jobType', label: '직무' },
  { key: 'mainRegion', label: '지역' },
  { key: 'etc', label: '기타' },
];

const MyInfo = ({ session }: Props) => {
  const { data, isPending, isError } = UseMetaDataQuery({ userId: session.user.id });

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생...</div>;

  const toggleModal = useModalStore((state) => state.toggleModal);
  const isModalOpen = useModalStore((state) => state.getIsModalOpen(USER_META_DATA));

  console.log(!data);

  return (
    <div className='flex flex-1 flex-col gap-4 overflow-hidden'>
      <div className='flex justify-between'>
        <Typography size='2xl' weight='bold'>
          <span className='text-primary-orange-600'>내 정보</span> 확인
        </Typography>
        <button onClick={() => toggleModal(USER_META_DATA)}>
          <SettingFill />
        </button>
      </div>
      {/* 높이 조정 필요 */}
      <ul className='flex h-full max-h-[35vh] flex-col gap-2 overflow-y-auto scrollbar-hide justify-center items-center'>
        {!data ? (
          <BlockComponent
            firstLine='이런! 내 정보가 없어요!'
            secondLine='내 정보를 등록해볼까요?'
            thirdLine='ChickMate와 함께 성장해요.'
            buttonName='내 정보 등록하기'
            onClick={() => toggleModal(USER_META_DATA)}
          />
        ) : (
          <>
            {fieldList.map(({ key, label }) => (
              <li key={key} className='flex gap-5 rounded-lg border border-gray-200 p-4'>
                <Typography size='xl' weight='bold' color='secondary-amber'>
                  {label}
                </Typography>
                <div>
                  <Typography>{data[key]}</Typography>
                  <Typography color='gray-500'>네카라쿠베당토</Typography>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
      {isModalOpen && (
        <Modal modalId={USER_META_DATA}>
          <UserMetaDataModal />
        </Modal>
      )}
    </div>
  );
};

export default MyInfo;
