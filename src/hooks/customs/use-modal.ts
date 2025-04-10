import { useState } from 'react';

/**
 * 모달을 열고 닫는데 이용하는 훅
 * @param initialState 모달이 처음부터 열려있는 상태 = true, 모달이 닫혀있는 상태 = false
 * @returns isModalOpen 모달이 열려있는지에 대한 상태
 * @returns openModal 모달이 여는 함수
 * @returns closeModal 모달이 닫는 함수
 */
export const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal };
};
