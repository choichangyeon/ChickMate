export type Field = {
  id: string;
  question: string;
  answer: string;
};

export type ResumeData = {
  title: string;
  fieldList: Field[];
};
