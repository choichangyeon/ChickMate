import type { ResumeType } from '@/types/DTO/resume-dto';

export type Field = {
  id: ResumeType['id'];
  question: string;
  answer: string;
};

export type ResumeData = {
  title: string;
  fieldList: Field[];
};
