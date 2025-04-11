'use client';

import { useEffect, useRef, useState } from 'react';
import Typography from '@/components/ui/typography';
import { useAudioRecorder } from '@/features/interview/hooks/use-audio-recorder';

const Timer = () => {
  const MINUTES_IN_MS = 1 * 60 * 1000;

  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MINUTES_IN_MS);

  const timerStartRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  /** hook */
  const { audioBlob, startRecording, stopRecording } = useAudioRecorder();

  /** function */
  const startTimer = () => {
    setIsTimerStart(true);
    startRecording();
    timerStartRef.current = Date.now();
    updateTimer();
  };

  const stopTimer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsTimerStart(false);
    stopRecording();
    setTimeLeft(MINUTES_IN_MS);
  };

  const updateTimer = () => {
    if (!timerStartRef.current) return;

    const timeElapsed = Date.now() - timerStartRef.current;
    const newTimeLeft = MINUTES_IN_MS - timeElapsed;

    if (newTimeLeft <= 0) {
      stopTimer();
      return;
    }

    setTimeLeft(newTimeLeft);
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };

  const handleButtonClick = () => {
    isTimerStart ? stopTimer() : startTimer();
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /** ui */
  return (
    <div className='flex h-[220px] w-[526px] flex-shrink-0 flex-col items-center justify-center gap-4 border-2 p-6'>
      <div className='flex flex-col items-center'>
        <Typography size='2xl'>제한시간 안에 답변을 완료하세요</Typography>
        <Typography size='sm' weight='medium'>
          타이머가 종료되면 자동으로 답변이 종료됩니다
        </Typography>
      </div>
      <div>
        <Typography color='primary-600' size='3xl' weight='black'>
          {minutes} : {seconds}
        </Typography>
      </div>
      <div>
        <button onClick={handleButtonClick}>{isTimerStart ? '답변 완료' : '말하기'}</button>
      </div>
    </div>
  );
};

export default Timer;
