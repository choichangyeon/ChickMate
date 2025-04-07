'use client';

import { useState } from 'react';

type Props = {
  questionText: string;
};

const QuestionAnswerField = ({ questionText }: Props) => {
  const [content, setContent] = useState({
    question: questionText || '',
    answer: '',
  });
  const { question, answer } = content;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setContent({ ...content, [id]: value });
  };

  return (
    <div className='flex flex-col'>
      <textarea id='question' value={question} onChange={handleChange} placeholder='질문을 입력하세요.' />
      <textarea id='answer' maxLength={1000} value={answer} onChange={handleChange} placeholder='답변을 입력하세요.' />
      <div>{answer.length} / 1000 (공백 포함)</div>
    </div>
  );
};

export default QuestionAnswerField;
