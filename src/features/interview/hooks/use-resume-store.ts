import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type resumeState = {
  id: number | null;
  setResume: (value: number) => void;
};

const initialState: resumeState = {
  id: null,
  setResume: () => {},
};

const useResumeStore = create<resumeState>()((set) => ({
  id: initialState.id,
  setResume: (id) => set({ id }),
}));

//persist 제외

export default useResumeStore;
