'use client';

import LeftArrowIcon from '@/components/icons/left-arrow-icon';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className='hidden mobile:block'
      onClick={() => {
        router.back();
      }}
    >
      <LeftArrowIcon />
    </div>
  );
};

export default BackButton;
