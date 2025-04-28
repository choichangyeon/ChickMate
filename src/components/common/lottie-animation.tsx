'use client';

import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import clsx from 'clsx';

// 부모가 사용할 메서드 타입에 속도 제어 및 활성화 재생 추가
export type LottieHandle = {
  play: () => void;
  reverse: () => void;
  setSpeed: (speed: number) => void;
};

// 필요한 props에 speed, active 옵션 추가
type Props = {
  animationData: any; // Lottie 애니메이션 JSON 데이터
  className?: string;
  speed?: number; // 재생 속도 (1 = 기본)
  active?: boolean; // 활성화 상태, true면 정방향 재생, false면 역방향
};

const LottieAnimationInner = (
  { animationData, className, speed = 1, active = false }: Props,
  ref: React.Ref<LottieHandle>
) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const isFirstRender = useRef(true);

  // 컴포넌트 마운트 시 0 프레임으로 초기화
  useEffect(() => {
    lottieRef.current?.goToAndStop(0, true);
  }, []);

  // 속도 설정 메서드
  const handleSetSpeed = (newSpeed: number) => {
    lottieRef.current?.setSpeed(newSpeed);
  };

  // 순방향 재생
  const handlePlay = () => {
    lottieRef.current?.setDirection(1);
    lottieRef.current?.setSpeed(speed);
    lottieRef.current?.goToAndPlay(0, true);
  };

  // 역방향 재생
  const handleReverse = () => {
    const lastFrame = animationData.op ?? 0;
    lottieRef.current?.setDirection(-1);
    lottieRef.current?.setSpeed(speed);
    lottieRef.current?.goToAndPlay(lastFrame, true);
  };

  // active prop 변화에 따라 자동 재생/역재생 (마운트 첫 실행 건너뛰기)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (active) {
        handlePlay();
      }
      return;
    }
    if (active) {
      handlePlay();
    } else {
      handleReverse();
    }
  }, [active]);

  // 부모 ref에 play, reverse, setSpeed 노출
  useImperativeHandle(ref, () => ({
    play: handlePlay,
    reverse: handleReverse,
    setSpeed: handleSetSpeed,
  }));

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={false}
      autoplay={false}
      className={clsx(className, 'flex h-full w-full items-center justify-center')}
      // TODO: 이 부분은 추후 수정가능
      rendererSettings={{
        preserveAspectRatio: 'none',
      }}
    />
  );
};

const LottieAnimation = forwardRef<LottieHandle, Props>(LottieAnimationInner);

export default LottieAnimation;
