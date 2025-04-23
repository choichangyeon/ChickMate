import { NOTIFLIX_CONFIRM } from '@/constants/notiflix-constants';
import { Confirm } from 'notiflix';

const { OK, CANCEL, CONFIRM } = NOTIFLIX_CONFIRM;

type Props = {
  message: string;
  okFunction: () => void;
  cancelFunction?: () => void;
};

/**
 * Confirm창 보여주는 함수
 * @param {String} message confirm창에서 보여줄 메시지
 * @param {Function} okFunction 확인 버튼을 눌렀을 때 실행하는 함수
 * @param {Function} cancelFunction 취소 버튼을 눌렀을 때 실행하는 함수
 */
export const showNotiflixConfirm = ({ message, okFunction, cancelFunction }: Props) => {
  document.body.classList.add('confirm-open');

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
