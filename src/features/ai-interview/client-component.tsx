'use client';

import { useState } from 'react';
import { getOpenAIResponse } from '@/features/ai-interview/api/client-services';

const resume = `1. 지원동기
사용자 경험을 개선하는 인터페이스를 직접 구현하는 과정에 매력을 느껴 프론트엔드 개발자가 되기로 결심했습니다. 대학에서 UX 디자인을 전공하며 사용자 중심의 사고를 배웠고, 이를 실현하기 위해 개발을 시작했습니다. React와 TypeScript를 활용한 프로젝트를 진행하며 UI/UX 원칙을 코드로 구현하는 경험을 쌓았습니다. 귀사는 혁신적인 서비스를 제공하며 사용자 중심의 개발 문화를 갖춘 기업으로 알고 있습니다. 저의 디자인 감각과 개발 역량을 결합해 사용자 친화적인 제품을 만드는 데 기여하고 싶습니다.


2. 입사 후 포부
입사 후에는 서비스의 사용성을 극대화하는 프론트엔드 개발자로 성장하고 싶습니다. 우선, 귀사의 기술 스택을 깊이 이해하고, 코드 품질을 향상하는 데 기여하겠습니다. 이후에는 성능 최적화와 접근성 개선을 통해 사용자 경험을 향상시키는 역할을 하고 싶습니다. 장기적으로는 백엔드와의 협업을 원활하게 하기 위해 서버 사이드 렌더링(SSR)과 API 설계도 학습할 계획입니다. 기술적으로 성장하면서 동시에 제품의 가치를 높이는 개발자가 되겠습니다.


3. 성장배경
대학 시절, 다양한 프로젝트를 경험하며 문제 해결 능력을 키웠습니다. 특히, UX 디자인 수업에서 사용자 리서치부터 프로토타이핑까지 진행하며 논리적인 사고와 협업 능력을 익혔습니다. 이후, 개발을 공부하며 직접 UI를 구현할 수 있다는 점에 흥미를 느껴 본격적으로 코딩을 시작했습니다. 프론트엔드 부트캠프에 참여하여 React, Next.js 등 최신 기술을 익히고, 팀 프로젝트를 수행하며 실무 경험을 쌓았습니다. 이러한 경험을 바탕으로 사용자 중심의 개발자가 되고자 합니다.


4. 성격 및 장단점
저는 논리적으로 사고하며 문제를 해결하는 것을 좋아하는 성격입니다. 개발 과정에서 발생하는 오류나 성능 문제를 분석하고 해결하는 과정에 보람을 느낍니다. 또한, 적극적으로 피드백을 반영하며 지속적으로 개선해 나가는 태도를 가지고 있습니다. 단점으로는 새로운 기술을 접할 때 깊이 파고드는 경향이 있어, 프로젝트 진행 속도가 느려질 때가 있습니다. 이를 보완하기 위해 최근에는 학습 계획을 세우고, 실무에서 바로 적용할 수 있는 기술을 우선적으로 익히려 노력하고 있습니다.


5. 위기 극복 사례
팀 프로젝트에서 API 호출 시 데이터가 정상적으로 렌더링되지 않는 문제가 발생한 적이 있습니다. 원인을 분석한 결과, 비동기 처리를 제대로 하지 않아 상태 업데이트가 늦어지는 문제였습니다. 저는 팀원들과 문제를 공유하고, useEffect와 SWR을 활용해 데이터를 효율적으로 가져오는 방법을 적용했습니다. 결국, 데이터 로딩 속도를 개선하고 사용자 경험을 향상시킬 수 있었습니다. 이 경험을 통해 문제를 분석하고 해결하는 능력을 키울 수 있었고, 협업의 중요성을 다시 한번 깨달았습니다.

6. 주도적으로 업무를 수행한 사례
프론트엔드 부트캠프에서 진행한 팀 프로젝트에서 UI/UX 개선을 주도적으로 수행한 경험이 있습니다. 기존 디자인이 사용자 친화적이지 않다는 피드백을 받고, 사용자 테스트를 통해 주요 불편 사항을 분석했습니다. 이를 바탕으로 UI를 개선하고, React와 TailwindCSS를 활용해 빠르게 반영했습니다. 또한, 디자인 의도를 팀원들에게 설명하며 원활한 협업을 이끌었습니다. 결과적으로 사용자 만족도가 높아졌고, 프로젝트의 완성도를 높이는 데 기여할 수 있었습니다.`;
const init_state = [
  {
    'role': 'system',
    'content': [
      {
        'type': 'text',
        'text': `You are a strict and challenging interviewer. Your role is to critically evaluate the candidate's responses by asking sharp and rigorous questions. You must thoroughly examine their logic, challenge their reasoning, and assess their problem-solving skills under pressure.\nFor each response the user provides, you must:\n- Analyze their answer critically.\n- Ask a follow-up question that probes deeper into their reasoning, challenges their assumptions, or explores edge cases.\n- Maintain a professional yet strict and demanding tone.\n \nThis process will continue for exactly 5 responses.  \nAfter the user has answered 5 times, you must conclude with the following statement:  \n"면접 보시느라 고생하셨습니다."`,
      },
    ],
  },
  { role: 'system', content: `지원자의 자기소개서: ${resume}` },
];

const ClientComponent = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState(init_state);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedMessageList = [
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
    // const response = await getOpenAIResponse(updatedMessageList);
    const response = [];
    if (response) {
      setMessageList(response);
      console.log(response);
      console.log(response.at(-1));
    } else {
      console.log('Error!');
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

export default ClientComponent;
