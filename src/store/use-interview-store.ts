import { create } from 'zustand';

type InterviewState = {
  questionIndex: number;
  incrementQuestionIndex: () => void;
};

const initialState: InterviewState = {
  questionIndex: 0,
  incrementQuestionIndex: () => {},
};

export const useInterviewStore = create<InterviewState>((set) => ({
  questionIndex: initialState.questionIndex,
  incrementQuestionIndex: () => set((state) => ({ questionIndex: state.questionIndex + 1 })),
}));
