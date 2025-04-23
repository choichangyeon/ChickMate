'use client';

import { showNotiflixConfirm } from '@/utils/show-notiflix-confirm';
import { useEffect, useState } from 'react';

const AlertInProgress = () => {
  const [isAlert, setIsAlert] = useState(false);
  useEffect(() => {
    if (!isAlert) {
      showNotiflixConfirm({
        message: `면접 진행 중인 내용이 있습니다. 이어서 면접을 진행하시겠습니까? \n
        (취소 시 면접 기록이 삭제됩니다.)`,
        okFunction: () => console.log('ok'),
        cancelFunction: () => console.log('cancel'),
      });
      setIsAlert(true);
    }
  }, []);

  return null;
};

export default AlertInProgress;
