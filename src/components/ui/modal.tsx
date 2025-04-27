'use client';

import { useModalStore } from '@/store/use-modal-store';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Close from '@/components/icons/close';
import Typography from './typography';

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
      if (document.body.classList.contains('confirm-open')) return;

      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        toggleModal(modalId);
      }
    };

    // ESC 키를 눌렀을 때 모달창이 닫힘
    const handleEscKey = (event: KeyboardEvent) => {
      if (document.body.classList.contains('confirm-open')) return;

      if (event.key === 'Escape') {
        toggleModal(modalId);
      }
    };

    // 모달 내부에서 focus되도록 유지함
    const handleKeyDownForFocusTrap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      if (!modalContentRef.current) return;

      const focusableElements = modalContentRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('keydown', handleKeyDownForFocusTrap);

    setTimeout(() => {
      const focusableElements = modalContentRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      focusableElements?.[0]?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('keydown', handleKeyDownForFocusTrap);
    };
  }, [toggleModal, modalId]);

  return createPortal(
    <div className='fixed inset-0 z-modal flex items-center justify-center overflow-y-auto'>
      <div className='fixed inset-0 bg-black opacity-70' />
      <div
        ref={modalContentRef}
        role='dialog'
        aria-labelledby={`${modalId}-title`}
        className='relative max-h-[650px] w-full max-w-[434px] animate-fadeIn flex-col overflow-scroll rounded-3xl border border-cool-gray-200 bg-white p-8 scrollbar-hide'
      >
        <Typography as='h2' srOnly id={`${modalId}-title`}>
          {modalId}
        </Typography>
        <button onClick={() => toggleModal(modalId)} className='absolute right-4 top-4'>
          <Close />
        </button>
        <div id={`${modalId}-description`} className={className}>
          {children}
        </div>
      </div>
    </div>,
    portalRoot || document.body
  );
};

export default Modal;
