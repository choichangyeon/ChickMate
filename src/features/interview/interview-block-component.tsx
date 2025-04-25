'use client';

import BlockComponent from '@/components/common/block-component';
import { PATH } from '@/constants/path-constant';
import React from 'react';

type Props = {
  type: 'unauthenticated' | 'getInterviewHistoryError' | 'completedPageError';
};

const {
  AUTH: { SIGN_IN },
  INTERVIEW: { START },
} = PATH;

const InterviewBlockComponent = ({ type }: Props) => {
  const content = {
    'unauthenticated': {
      firstLine: '이런! 로그인을 하지 않았네요!',
      secondLine: '로그인이 필요합니다!',
      thirdLine: 'AI 면접은 로그인 후 진행 부탁드립니다.',
      buttonName: '로그인하러 가기',
      href: SIGN_IN,
    },
    'getInterviewHistoryError': {
      firstLine: '이런! 면접 기록을 가져오지 못했네요!',
      secondLine: '기록 요청에 오류가 발생했습니다!',
      thirdLine: '잠시 후 다시 진행 부탁드립니다.',
      buttonName: '면접 선택 페이지로 가기',
      href: START,
    },
    'completedPageError': {
      firstLine: '이런! 이미 만료된 면접이네요!',
      secondLine: '면접 페이지 접근 오류가 발생했습니다!',
      thirdLine: '다시 면접 진행을 부탁드립니다.',
      buttonName: '면접 선택 페이지로 가기',
      href: START,
    },
  }[type];

  return <BlockComponent {...content} />;
};

export default InterviewBlockComponent;
