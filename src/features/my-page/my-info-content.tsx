import clsx from 'clsx';
import type { FieldList } from '@/features/my-page/my-info';
import Button from '@/components/ui/button';
import { useModalStore } from '@/store/use-modal-store';
import { MODAL_ID } from '@/constants/modal-id-constants';
import type { UserMetaDataType } from '@/types/user-meta-data-type';

type Props = {
  fieldList: FieldList[];
  data: UserMetaDataType;
};

const { USER_META_DATA } = MODAL_ID;

const MyInfoContent = ({ fieldList, data }: Props) => {
  const toggleModal = useModalStore((state) => state.toggleModal);
  return (
    <div>
      <ul className='mb-4 border-b border-t p-4'>
        {fieldList.map(({ key, label }, index) => {
          const isLastChild = fieldList.length === index + 1;
          return (
            <li className={clsx(isLastChild ? 'mb-0' : 'mb-4')}>
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
