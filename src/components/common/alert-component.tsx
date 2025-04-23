'use client';

import { showNotiflixConfirm } from '@/utils/show-notiflix-confirm';

type Props = {
  message: string;
  okFunction: () => void;
  cancelFunction?: () => void;
};

const AlertComponent = ({ message, okFunction, cancelFunction }: Props) => {
  showNotiflixConfirm({
    message,
    okFunction,
    cancelFunction,
  });
  return null;
};

export default AlertComponent;
