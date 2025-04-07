import React from 'react';
import QuestionAnswerField from '@/features/resume/question-answer-field';

const ResumeForm = () => {
  const defaultQuestionList = [
    { key: 'motive', questionText: '해당 회사를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오.' },
    {
      key: 'growth',
      questionText:
        '본인의 성장 과정을 간략히 기술하되 현재의 자신에게 가장 큰 영향을 끼친 사건, 인물 등을 포함하여 기술하십시오.',
    },
    {
      key: 'experience',
      questionText:
        '지원 직무 관련 프로젝트/과제 중 기술적으로 가장 어려웠던 과제와 해결 방안에 대해 구체적으로 서술하십시오.',
    },
  ];

  return (
    <form>
      {defaultQuestionList.map((defaultQuestion) => {
        const { key, questionText } = defaultQuestion;

        return <QuestionAnswerField key={key} questionText={questionText} />;
      })}
      <button>추가하기</button>
    </form>
  );
};

export default ResumeForm;
