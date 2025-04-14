import { boolean } from 'zod';
import { create } from 'zustand';

type Modal = {
  id: string;
  isModalOpen: boolean;
};

type ModalState = {
  modalList: Modal[];
  getIsModalOpen: (id: string) => boolean;
  toggleModal: (id: string) => void;
};

const initialState: ModalState = {
  modalList: [],
  getIsModalOpen: () => true || false,
  toggleModal: () => {},
};

export const useModalStore = create<ModalState>()((set, get) => ({
  modalList: initialState.modalList,
  getIsModalOpen: (modalId) => get().modalList.find((modal) => modal.id === modalId)?.isModalOpen || false,
  toggleModal: (id) =>
    set((state) => {
      const selectedModal = state.modalList.find((modal) => modal.id === id);
      const isModalOpen = selectedModal ? !selectedModal.isModalOpen : true;

      const newModalList = [...state.modalList.filter((modal) => modal.id !== id), { id, isModalOpen }];

      return {
        modalList: newModalList,
      };
    }),
}));
