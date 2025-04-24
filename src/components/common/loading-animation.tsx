'use client';

import React from 'react';
import Lottie from 'lottie-react';
import Loading from '@/lottie/loding.json';

const LoadingAnimation = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Lottie animationData={Loading} loop autoplay style={{ width: 300, height: 300 }} />
    </div>
  );
};

export default LoadingAnimation;
