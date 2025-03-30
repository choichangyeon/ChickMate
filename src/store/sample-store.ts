import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type SampleState = {
  sample: string;
  setSample: (value: string) => void;
};

const initialState: SampleState = {
  sample: 'sample',
  setSample: () => {},
};

const useSampleStore = create<SampleState>()(
  persist(
    (set) => ({
      sample: initialState.sample,
      setSample: (value) => set({ sample: value }),
    }),
    { name: 'sample-store', storage: createJSONStorage(() => localStorage) }
  )
);

export default useSampleStore;
