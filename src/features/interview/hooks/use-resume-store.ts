import { create } from 'zustand';

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

export default useResumeStore;
