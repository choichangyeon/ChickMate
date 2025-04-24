'use client';

import BlockComponent from '@/components/common/block-component';
import { PATH } from '@/constants/path-constant';
import React from 'react';

type Props = {
  type: 'unauthenticated' | 'getResumeError';
};

const {
  AUTH: { SIGN_IN },
} = PATH;

const InterviewBlockComponent = ({ type }: Props) => {
  const content = {
    'unauthenticated': {
      firstLine: '이런! 로그인을 하지 않았네요!',
      secondLine: '로그인이 필요합니다!',
      thirdLine: '맞춤형 채용공고는 내 정보를 기반으로 진행됩니다.',
      buttonName: '로그인하러 가기',
      href: SIGN_IN,
    },
    'getResumeError': {
      firstLine: '이런! 자소서 정보를 가져오지 못했네요!',
      secondLine: '정보 요청에 오류가 발생했습니다!',
      thirdLine: '맞춤형 채용공고는 내 정보를 기반으로 진행됩니다.',
      buttonName: '로그인하러 가기',
      href: SIGN_IN,
    },
  }[type];

  return <BlockComponent {...content} />;
};

export default InterviewBlockComponent;
