import { create } from 'zustand';

type InterviewState = {
  questionIndex: number;
  incrementQuestionIndex: () => void;
  resetQuestionIndex: () => void;
  setQuestionIndex: (index: number) => void;
};

const initialState: InterviewState = {
  questionIndex: 0,
  incrementQuestionIndex: () => {},
  resetQuestionIndex: () => {},
  setQuestionIndex: (index: number) => {},
};

export const useInterviewStore = create<InterviewState>((set) => ({
  questionIndex: initialState.questionIndex,
  incrementQuestionIndex: () => set((state) => ({ questionIndex: state.questionIndex + 1 })),
  resetQuestionIndex: () => set({ questionIndex: 0 }),
  setQuestionIndex: (index: number) => set({ questionIndex: index }),
}));
