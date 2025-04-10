'use client';

import { useModalStore } from '@/store/use-modal-store';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  portalRoot?: HTMLElement;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ portalRoot, children, className }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = useModalStore((state) => state.toggleModal);

  useEffect(() => {
    setIsMounted(true);

    // 모달 외부를 클릭했을 때 모달창이 닫힘
    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        toggleModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // ESC 키를 눌렀을 때 모달창이 닫힘
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [toggleModal]);

  if (!isMounted) return null;

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto'>
      <div className='fixed inset-0 bg-black opacity-70' onClick={toggleModal} />
      <div ref={modalContentRef} className='relative w-full max-w-[750px] flex-col rounded-lg bg-white p-8'>
        <div className={className}>{children}</div>
      </div>
    </div>,
    portalRoot || document.body
  );
};

export default Modal;
