'use client';

import useBlockBackEntry from '@/features/interview/hooks/use-block-back-entry';
import InterviewClient from '@/features/interview/interview-client';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import type { InterviewQnAType } from '@/types/DTO/interview-qna-dto';
import { PATH } from '@/constants/path-constant';

const {
  INTERVIEW: { START },
} = PATH;

type Props = {
  interviewHistory: InterviewHistoryType;
  interviewQnAList: InterviewQnAType[];
};

const InterviewClientWrapper = ({ interviewHistory, interviewQnAList }: Props) => {
  useBlockBackEntry(START);
  return <InterviewClient interviewHistory={interviewHistory} interviewQnAList={interviewQnAList} />;
};

export default InterviewClientWrapper;
