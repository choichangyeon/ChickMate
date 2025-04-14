import { create } from 'zustand';

type resumeState = {
  resumeId: number | null;
  setResume: (value: number) => void;
};

const initialState: resumeState = {
  resumeId: null,
  setResume: () => {},
};

const useResumeStore = create<resumeState>()((set) => ({
  resumeId: initialState.resumeId,
  setResume: (resumeId) => set({ resumeId }),
}));

export default useResumeStore;
