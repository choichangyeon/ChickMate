import { create } from 'zustand';

type InterviewState = {
  questionIndex: number;
  hasCompleted: boolean;
  incrementQuestionIndex: () => void;
  resetQuestionIndex: () => void;
  setQuestionIndex: (index: number) => void;
  setCompleted: (state: boolean) => void;
};

const initialState: InterviewState = {
  questionIndex: 0,
  hasCompleted: false,
  incrementQuestionIndex: () => {},
  resetQuestionIndex: () => {},
  setQuestionIndex: (index: number) => {},
  setCompleted: (state: boolean) => {},
};

export const useInterviewStore = create<InterviewState>((set) => ({
  questionIndex: initialState.questionIndex,
  hasCompleted: initialState.hasCompleted,
  incrementQuestionIndex: () => set((state) => ({ questionIndex: state.questionIndex + 1 })),
  resetQuestionIndex: () => set({ questionIndex: 0 }),
  setQuestionIndex: (index: number) => set({ questionIndex: index }),
  setCompleted: (state: boolean) => set({ hasCompleted: state }),
}));
