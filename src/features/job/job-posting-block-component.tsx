'use client';

import BlockComponent from '@/components/common/block-component';
import { PATH } from '@/constants/path-constant';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  type: 'unauthenticated' | 'no-profile' | 'no-job-data' | 'fetch-error' | 'no-bookmark';
};

const {
  AUTH: { SIGN_IN },
  MY_PAGE,
} = PATH;

export const JobPostingBlockComponent = ({ type }: Props) => {
  const router = useRouter();
  const content = {
    'unauthenticated': {
      firstLine: '이런! 로그인을 하지 않았네요!',
      secondLine: '로그인이 필요합니다!',
      thirdLine: '맞춤형 채용공고는 내 정보를 기반으로 진행됩니다.',
      buttonName: '로그인하러 가기',
      href: SIGN_IN,
    },
    'no-profile': {
      firstLine: '이런! 사용자 정보를 설정하지 않았네요!',
      secondLine: '내 정보를 작성해볼까요?',
      thirdLine: '맞춤형 채용공고는 내 정보를 기반으로 진행됩니다.',
      buttonName: '내 정보 설정하기',
      href: MY_PAGE,
    },
    'no-job-data': {
      firstLine: '이런! 나에게 맞는 채용공고가 없어요!',
      secondLine: '채용공고를 다시 요청할까요?',
      thirdLine: '맞춤형 채용공고는 내 정보를 기반으로 진행됩니다.',
    },
    'fetch-error': {
      firstLine: '이런! 서버와의 통신이 불안정해요!',
      secondLine: '채용 공고를 다시 불러올까요?',
      thirdLine: '맞춤형 채용공고는 내 정보를 기반으로 진행됩니다.',
      buttonName: '채용공고 불러오기!',
      onClick: () => router.refresh(),
    },
    'no-bookmark': {
      firstLine: '이런! 북마크한 채용 공고가 없어요!',
      secondLine: '내 맘에 쏙 든 채용 공고를 북마크 해볼까요?',
      thirdLine: '맞춤형 채용공고는 내 정보를 기반으로 진행됩니다.',
    },
  }[type];

  return <BlockComponent {...content} />;
};
