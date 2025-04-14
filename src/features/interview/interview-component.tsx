'use client';

import { useState } from 'react';
import { getOpenAIResponse } from '@/features/interview/api/client-services';
import { Message } from '@/types/message';
import { INTERVIEW_PROMPT, resume } from '@/constants/interview-constants';

const InterviewComponent = () => {
  const { CALM_PROMPT, PRESSURE_PROMPT } = INTERVIEW_PROMPT;
  const init_state: Message[] = [
    { role: 'system', content: [...CALM_PROMPT.content, { type: 'text', text: `지원자의 자기소개서: ${resume}` }] },
  ];
  const [messageList, setMessageList] = useState<Message[]>(init_state);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const updatedMessageList: Message[] = [
        ...messageList,
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: message,
            },
          ],
        },
      ];
      const response = await getOpenAIResponse({ messageList: updatedMessageList });
      setMessageList(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className='ml-[30px]' onSubmit={handleSubmit}>
      <textarea
        className='h-[300px] w-[300px] bg-gray-200'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type='submit'>TEST</button>
    </form>
  );
};

export default InterviewComponent;
