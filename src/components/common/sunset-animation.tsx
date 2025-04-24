'use client';

import React from 'react';
import Lottie from 'lottie-react';
import Sunset from '@/lottie/sunset.json';

const SunsetAnimation = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Lottie animationData={Sunset} className='h-full w-full' />
    </div>
  );
};

export default SunsetAnimation;
