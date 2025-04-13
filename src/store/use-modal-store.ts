import { create } from 'zustand';

type Modal = {
  id: string;
  isModalOpen: boolean;
};

type ModalStore = {
  modalList: Modal[];
  getIsModalOpen: (id: string) => boolean;
  toggleModal: (id: string) => void;
};

export const useModalStore = create<ModalStore>()((set, get) => ({
  modalList: [],
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
