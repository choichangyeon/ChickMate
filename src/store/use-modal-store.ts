import { create } from 'zustand';

type ModalState = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

const initialState: ModalState = {
  isModalOpen: false,
  toggleModal: () => {},
};

export const useModalStore = create<ModalState>()((set) => ({
  isModalOpen: initialState.isModalOpen,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
