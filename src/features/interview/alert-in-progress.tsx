'use client';

import { showNotiflixConfirm } from '@/utils/show-notiflix-confirm';

const AlertInProgress = () => {
  showNotiflixConfirm({
    message: `면접 진행 중인 내용이 있습니다. 이어서 면접을 진행하시겠습니까? \n
    (취소 시 면접 기록이 삭제됩니다.)`,
    okFunction: () => console.log('ok'),
    cancelFunction: () => console.log('cancel'),
  });

  return <></>;
};

export default AlertInProgress;
