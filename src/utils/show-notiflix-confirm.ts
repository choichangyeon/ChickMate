import { Confirm } from 'notiflix';
import { NOTIFLIX_CONFIRM_DEFAULT } from '@/constants/notiflix-constants';

const { OK_BUTTON_TEXT, CANCEL_BUTTON_TEXT, CONFIRM } = NOTIFLIX_CONFIRM_DEFAULT;

type Props = {
  title?: string;
  message: string;
  okButtonText?: string;
  cancelButtonText?: string;
  okFunction: () => void;
  cancelFunction?: () => void;
};

/**
 * Confirm창 보여주는 함수
 * @param {String} title confirm창에서 보여줄 제목
 * @param {String} message confirm창에서 보여줄 메시지
 * @param {String} okButtonText 확인 버튼명
 * @param {String} cancelButtonText 취소 버튼명
 * @param {Function} okFunction 확인 버튼을 눌렀을 때 실행하는 함수
 * @param {Function} cancelFunction 취소 버튼을 눌렀을 때 실행하는 함수
 */
export const showNotiflixConfirm = ({
  title = CONFIRM,
  message,
  okButtonText = OK_BUTTON_TEXT,
  cancelButtonText = CANCEL_BUTTON_TEXT,
  okFunction,
  cancelFunction,
}: Props) => {
  document.body.classList.add('confirm-open');

  Confirm.show(
    title,
    message,
    okButtonText,
    cancelButtonText,
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
