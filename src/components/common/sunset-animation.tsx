'use client';

import React, { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import Sunset from '@/lottie/sunset.json';

const SunsetAnimation = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const handlePlay = () => {
    // 처음부터 다시 재생하려면 goToAndPlay(0, true) 써도 되고

    lottieRef.current?.goToAndPlay(0, true);
  };
  const check = () => {
    lottieRef.current?.stop(); // 멈추기
    lottieRef.current?.goToAndStop(0, true);
  };
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Lottie lottieRef={lottieRef} animationData={Sunset} loop={false} autoplay={false} className='h-full w-full' />

      <button onClick={handlePlay} className='rounded bg-blue-500 px-4 py-2 text-white'>
        애니메이션 재생
      </button>
      <button onClick={check} className='rounded bg-primary-orange-600 px-4 py-2 text-white'>
        확인
      </button>
    </div>
  );
};

export default SunsetAnimation;
