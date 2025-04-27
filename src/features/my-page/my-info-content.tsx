import clsx from 'clsx';
import Button from '@/components/ui/button';
import { useModalStore } from '@/store/use-modal-store';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import type { UserMetaDataType } from '@/types/user-meta-data-type';

type Props = {
  data: UserMetaDataType;
};
type FieldList = {
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

const MyInfoContent = ({ data }: Props) => {
  const toggleModal = useModalStore((state) => state.toggleModal);
  return (
    <div>
      <ul className='mb-4 border-b border-t p-4'>
        {fieldList.map(({ key, label }, index) => {
          const isLastChild = fieldList.length === index + 1;
          return (
            <li key={`my_info_list_${key}`} className={clsx(isLastChild ? 'mb-0' : 'mb-4')}>
              <dl className='flex items-center'>
                <dt className='mr-10 w-[180px] font-bold'>{label}</dt>
                <dd className='text-coolgray-500'>{data[key]}</dd>
              </dl>
            </li>
          );
        })}
      </ul>
      <Button variant='outline' color='dark' onClick={() => toggleModal(USER_META_DATA)}>
        수정하기
      </Button>
    </div>
  );
};

export default MyInfoContent;
