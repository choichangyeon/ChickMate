import { useState } from 'react';

type Props = {
  initialState?: boolean;
};

export const useModal = ({ initialState = false }: Props = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal };
};
