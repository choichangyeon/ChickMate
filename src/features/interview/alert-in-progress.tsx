'use client';

import { NOTIFLIX_WARNING_INTERVIEW_IN_PROGRESS } from '@/constants/notiflix-constants';
import { showNotiflixConfirm } from '@/utils/show-notiflix-confirm';
import { useEffect, useState } from 'react';
import { deleteInterviewHistory } from '@/features/interview/api/client-services';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';

const { WARNING, OK_BUTTON_TEXT, CANCEL_BUTTON_TEXT, MESSAGE } = NOTIFLIX_WARNING_INTERVIEW_IN_PROGRESS;
const { LIVE } = PATH.INTERVIEW;

type Props = {
  interviewId: number;
};

const AlertInProgress = ({ interviewId }: Props) => {
  const [isAlert, setIsAlert] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!isAlert) {
      showNotiflixConfirm({
        title: WARNING,
        message: MESSAGE,
        okButtonText: OK_BUTTON_TEXT,
        cancelButtonText: CANCEL_BUTTON_TEXT,
        okFunction: () => router.push(LIVE(interviewId)),
        cancelFunction: () => deleteInterviewHistory({ interviewId }),
      });
      setIsAlert(true);
    }
  }, [isAlert]);

  return null;
};

export default AlertInProgress;
