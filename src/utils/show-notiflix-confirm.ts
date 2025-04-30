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
      document.removeEventListener('keydown', handleKeyDown);
      focusModalInside();
      okFunction();
    },
    () => {
      document.body.classList.remove('confirm-open');
      document.removeEventListener('keydown', handleKeyDown);
      focusModalInside();
      cancelFunction?.();
    }
  );

  // confirm에서 Tab/Enter Key 동작하게 만들어 줌
  const handleKeyDown = (event: KeyboardEvent) => {
    const okButton = document.querySelector<HTMLAnchorElement>('.nx-confirm-button-ok');
    const cancelButton = document.querySelector<HTMLAnchorElement>('.nx-confirm-button-cancel');
    if (!okButton || !cancelButton) return;

    const activeElement = document.activeElement;

    if (event.key === 'Tab') {
      if (activeElement !== okButton && activeElement !== cancelButton) {
        event.preventDefault();
        okButton.focus();
        return;
      }

      if (event.shiftKey) {
        // Shift + Tab
        if (activeElement === okButton) {
          event.preventDefault();
          cancelButton.focus();
        } else if (activeElement === cancelButton) {
          event.preventDefault();
          okButton.focus();
        }
      } else {
        // Tab
        if (activeElement === okButton) {
          event.preventDefault();
          cancelButton.focus();
        } else if (activeElement === cancelButton) {
          event.preventDefault();
          okButton.focus();
        }
      }
    }

    if (event.key === 'Enter') {
      if (activeElement === okButton || activeElement === cancelButton) {
        event.preventDefault();
        (activeElement as HTMLAnchorElement).click();
      }
    }
  };

  // 확인/취소 버튼 눌렀을 때 모달 내부로 focus하기
  const focusModalInside = () => {
    const modalContent = document.querySelector<HTMLElement>('[role="dialog"]');
    if (!modalContent) return;

    const focusableElements = modalContent.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    firstElement?.focus();
  };

  setTimeout(() => {
    const okButton = document.querySelector<HTMLAnchorElement>('.nx-confirm-button-ok');
    const cancelButton = document.querySelector<HTMLAnchorElement>('.nx-confirm-button-cancel');

    if (okButton) okButton.setAttribute('tabindex', '0');
    if (cancelButton) cancelButton.setAttribute('tabindex', '0');

    (okButton || cancelButton)?.focus();

    document.addEventListener('keydown', handleKeyDown);
  }, 0);
};
