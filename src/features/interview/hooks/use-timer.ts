import { useEffect, useRef, useState } from 'react';

type Props = {
  duration: number;
  onTimerComplete?: () => void;
};

export const useTimer = ({ duration, onTimerComplete }: Props) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  const timerStartRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startTimer = () => {
    setIsRunning(true);
    timerStartRef.current = Date.now();
    updateTimer();
  };

  const stopTimer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const updateTimer = () => {
    if (!timerStartRef.current) return;

    const timeElapsed = Date.now() - timerStartRef.current;

    const newTimeLeft = duration - timeElapsed;

    if (newTimeLeft <= 0) {
      setTimeLeft(0);
      setIsRunning(false);
      if (onTimerComplete) onTimerComplete();
      return;
    }

    setTimeLeft(newTimeLeft);
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const formatTime = () => {
    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
    return { minutes, seconds };
  };

  return {
    isRunning,
    timeLeft,
    formatTime,
    startTimer,
    stopTimer,
  };
};
