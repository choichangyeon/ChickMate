'use client';

import React from 'react';
import Lottie from 'lottie-react';
import Loading from '@/lottie/loading.json';
import BlackLoading from '@/lottie/black-loading.json';
import clsx from 'clsx';

type Props = {
  className?: string;
  option?: 'default' | 'black';
};

const LoadingAnimation = ({ className, option = 'default' }: Props) => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      {option === 'black' ? (
        <Lottie animationData={BlackLoading} loop={Infinity} autoplay={true} className={clsx('w-full', className)} />
      ) : (
        <Lottie animationData={Loading} loop={Infinity} autoplay={true} className={clsx('w-full', className)} />
      )}
    </div>
  );
};

export default LoadingAnimation;
