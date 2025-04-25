'use client';

import React from 'react';
import Lottie from 'lottie-react';
import Loading from '@/lottie/loding.json';
import clsx from 'clsx';

type Props = {
  className?: string;
};

const LoadingAnimation = ({ className }: Props) => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Lottie animationData={Loading} loop autoplay className={clsx('w-full', className)} />
    </div>
  );
};

export default LoadingAnimation;
