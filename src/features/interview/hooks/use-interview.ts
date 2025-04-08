import { INTERVIEW_PROMPT, INTERVIEW_TYPE } from '@/constants/interview-constants';
import { Message } from '@/types/message';
import { useState } from 'react';

const { PRESSURE, CALM } = INTERVIEW_TYPE;

type Props = {
  interviewType: string;
  resume: string;
};

export const useInterview = ({ interviewType, resume }: Props) => {
  const { CALM_PROMPT, PRESSURE_PROMPT } = INTERVIEW_PROMPT;

  const init_state: Message[] = [{ role: 'system', content: `지원자의 자기소개서: ${resume}` }];
  const [messageList, setMessageList] = useState<Message[]>(init_state);
};
