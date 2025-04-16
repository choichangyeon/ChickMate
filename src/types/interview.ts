import { InterviewHistory } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export type InterviewQnAData = {
  question: string;
  answer: string;
};

export type InterviewHistoryWithResume = InterviewHistory & {
  resume: {
    content: JsonValue;
  };
};
