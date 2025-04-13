import Modal from '@/components/common/modal';
import { create } from 'zustand';

type Modal = {
  id: string;
  isModalOpen: boolean;
};

type ModalState = {
  modalList: Modal[];
  toggleModal: (id: string) => void;
};

const initialState: ModalState = {
  modalList: [],
  toggleModal: () => [],
};

export const useModalStore = create<ModalState>()((set) => ({
  modalList: initialState.modalList,
  toggleModal: (id) =>
    set((state) => {
      const modal = state.modalList.find((modal) => modal.id === id);
      const isModalOpen = modal ? !modal.isModalOpen : true;
      return {
        modalList: [...state.modalList.filter((modal) => modal.id !== id), { id, isModalOpen }],
      };
    }),
}));
