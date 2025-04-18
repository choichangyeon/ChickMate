'use client';

import { useModalStore } from '@/store/use-modal-store';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  modalId: string;
  portalRoot?: HTMLElement;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ portalRoot, modalId, children, className }: Props) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = useModalStore((state) => state.toggleModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // 모달 외부를 클릭했을 때 모달창이 닫힘
    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        toggleModal(modalId);
      }
    };

    // ESC 키를 눌렀을 때 모달창이 닫힘
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleModal(modalId);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [toggleModal, modalId]);

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto'>
      <div className='fixed inset-0 bg-black opacity-70' />
      {/* 모달 width 변경 - 빠른 재조정 시급 */}
      <div ref={modalContentRef} className='relative w-full max-w-[600px] flex-col rounded-lg bg-white p-8'>
        <button onClick={() => toggleModal(modalId)} className='absolute right-4 top-4'>
          X
        </button>
        <div className={className}>{children}</div>
      </div>
    </div>,
    portalRoot || document.body
  );
};

export default Modal;
