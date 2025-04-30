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
    <div className='w-full'>
      <ul className='scrollbar-hidden mb-4 flex overflow-x-auto desktop:block desktop:border-b desktop:border-t desktop:p-4'>
        {fieldList.map(({ key, label }, index) => {
          const isLastChild = fieldList.length === index + 1;
          if (!data[key]) return null;
          return (
            <li key={`my_info_list_${key}`} className={clsx(isLastChild ? 'mr-0 desktop:mb-0' : 'mr-4 desktop:mb-4')}>
              <dl className='flex items-center rounded-[8px] border p-4 desktop:border-0 desktop:p-0'>
                <dt className='mr-5 whitespace-nowrap font-bold text-secondary-amber desktop:mr-10 desktop:w-[180px]'>
                  {label}
                </dt>
                <dd className='text-coolgray-500 whitespace-nowrap font-bold'>{data[key]}</dd>
              </dl>
            </li>
          );
        })}
      </ul>
      <div className='hidden desktop:block'>
        <Button size='fixed' onClick={() => toggleModal(USER_META_DATA)}>
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default MyInfoContent;
