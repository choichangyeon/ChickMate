'use client';

import { NOTIFLIX_WARNING_INTERVIEW_IN_PROGRESS } from '@/constants/notiflix-constants';
import { showNotiflixConfirm } from '@/utils/show-notiflix-confirm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';
import { INTERVIEW_HISTORY_STATUS } from '@/constants/interview-constants';
import { Session } from 'next-auth';
import { useInProgressQuery } from './hooks/use-in-progress-query';
import { useInProgressMutation } from './hooks/use-in-progress-mutation';
import { Notify } from 'notiflix';

const {
  WARNING,
  DEFAULT: { OK_BUTTON_TEXT, CANCEL_BUTTON_TEXT, MESSAGE },
  ERROR: { ERROR_MESSAGE },
} = NOTIFLIX_WARNING_INTERVIEW_IN_PROGRESS;
const { LIVE } = PATH.INTERVIEW;
const OPTIONS = 'ALL';

type Props = {
  session: Session;
};

const AlertInProgress = ({ session }: Props) => {
  const userId = session.user.id;
  const [isAlert, setIsAlert] = useState(false);
  const { data, isError } = useInProgressQuery(userId);
  const { mutate: inProgressMutate, error: inProgressMutateError } = useInProgressMutation(userId);
  const router = useRouter();

  useEffect(() => {
    if (!isAlert && isError) {
      Notify.warning(ERROR_MESSAGE);
      setIsAlert(true);
    }
    if (!isAlert && data) {
      const { id: interviewId, status } = data;
      showNotiflixConfirm({
        title: WARNING,
        message: MESSAGE,
        okButtonText: OK_BUTTON_TEXT,
        cancelButtonText: CANCEL_BUTTON_TEXT,
        okFunction: () => router.push(LIVE(interviewId)),
        cancelFunction: () => inProgressMutate({ interviewId, status, options: OPTIONS }),
      });
      setIsAlert(true);
    }
  }, [data, isError]);

  return null;
};

export default AlertInProgress;
