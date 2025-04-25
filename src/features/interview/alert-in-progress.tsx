'use client';

import { NOTIFLIX_WARNING_INTERVIEW_IN_PROGRESS } from '@/constants/notiflix-constants';
import { showNotiflixConfirm } from '@/utils/show-notiflix-confirm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';
import { Session } from 'next-auth';
import { useInProgressQuery } from './hooks/use-in-progress-query';
import { useInProgressDeleteMutation } from './hooks/use-in-progress-mutation';
import { Notify } from 'notiflix';

const {
  WARNING,
  DEFAULT: { OK_BUTTON_TEXT, CANCEL_BUTTON_TEXT, MESSAGE },
  ERROR: { REQUEST_ERROR },
} = NOTIFLIX_WARNING_INTERVIEW_IN_PROGRESS;
const { LIVE } = PATH.INTERVIEW;
const OPTIONS = 'ALL';

type Props = {
  session: Session;
};

const AlertInProgress = ({ session }: Props) => {
  const userId = session.user.id;
  const [isAlert, setIsAlert] = useState(false);
  const { data, isError, isPending } = useInProgressQuery(userId);
  const { mutateAsync: inProgressDeleteMutate } = useInProgressDeleteMutation();
  const router = useRouter();

  console.log('data>>>>>>>', data);
  if (isPending && !isAlert) {
    return null;
  }
  if (isError && !isAlert) {
    Notify.warning(REQUEST_ERROR);
    setIsAlert(true);
    return null;
  }
  if (data && !isAlert) {
    const { id: interviewId, status } = data;
    showNotiflixConfirm({
      title: WARNING,
      message: MESSAGE,
      okButtonText: OK_BUTTON_TEXT,
      cancelButtonText: CANCEL_BUTTON_TEXT,
      okFunction: () => {
        router.push(LIVE(interviewId));
        router.refresh();
      },
      cancelFunction: async () => {
        await inProgressDeleteMutate({ interviewId, status, options: OPTIONS });
      },
    });
    setIsAlert(true);
    return null;
  }

  return null;
};

export default AlertInProgress;
