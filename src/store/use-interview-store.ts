import { create } from 'zustand';

type InterviewState = {
  questionIndex: number;
  incrementQuestionIndex: () => void;
  resetQuestionIndex: () => void;
};

const initialState: InterviewState = {
  questionIndex: 0,
  incrementQuestionIndex: () => {},
  resetQuestionIndex: () => {},
};

export const useInterviewStore = create<InterviewState>((set) => ({
  questionIndex: initialState.questionIndex,
  incrementQuestionIndex: () => set((state) => ({ questionIndex: state.questionIndex + 1 })),
  resetQuestionIndex: () => set({ questionIndex: 0 }),
}));
