import { NOTIFLIX_CONFIRM } from '@/constants/notiflix-constants';
import { Confirm } from 'notiflix';

const { OK, CANCEL, CONFIRM } = NOTIFLIX_CONFIRM;

type Props = {
  message: string;
  okFunction: () => void;
  cancelFunction?: () => void;
};

export const showNotiflixConfirm = ({ message, okFunction, cancelFunction }: Props) => {
  Confirm.show(
    CONFIRM,
    `${message}`,
    OK,
    CANCEL,
    () => {
      document.body.classList.remove('confirm-open');
      okFunction();
    },
    () => {
      document.body.classList.remove('confirm-open');
      cancelFunction?.();
    }
  );
};
