'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import Loading from '@/lottie/loading.json';
import BlackLoading from '@/lottie/black-loading.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type Props = {
  className?: string;
  option?: 'default' | 'black';
};

const LoadingAnimation = ({ className, option = 'default' }: Props) => (
  <div className='flex h-full w-full items-center justify-center'>
    <Lottie
      animationData={option === 'black' ? BlackLoading : Loading}
      loop
      autoplay
      className={clsx('w-full', className)}
    />
  </div>
);

export default LoadingAnimation;
