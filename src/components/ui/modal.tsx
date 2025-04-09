'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  hasCloseButton?: boolean;
  portalRoot?: HTMLElement;
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal = ({ hasCloseButton, portalRoot, closeModal, children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);

    // 모달 외부를 클릭했을 때 모달창이 닫힘
    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // ESC 키를 눌렀을 때 모달창이 닫힘
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [closeModal]);

  if (!isMounted) return null;

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto'>
      <div className='fixed inset-0 bg-black opacity-70' onClick={closeModal} />
      <div ref={modalContentRef} className='relative w-full max-w-[750px] flex-col rounded-lg bg-white p-8'>
        {hasCloseButton && (
          <button type='button' onClick={closeModal}>
            닫기
          </button>
        )}
        {children}
      </div>
    </div>,
    portalRoot || document.body
  );
};

export default Modal;
