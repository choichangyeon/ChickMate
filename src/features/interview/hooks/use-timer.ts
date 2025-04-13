import { useEffect, useRef, useState } from 'react';

type Props = {
  duration: number;
  onTimerComplete?: () => void;
};

export const useTimer = ({ duration, onTimerComplete }: Props) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return;

    setIsRunning(true);
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const timeElapsed = Date.now() - startTime;
      const newTimeLeft = duration - timeElapsed;

      if (newTimeLeft <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTimeLeft(duration);
        setIsRunning(false);
        if (onTimerComplete) onTimerComplete();
      }

      setTimeLeft(newTimeLeft);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(false);
    setTimeLeft(duration);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = () => {
    const minutes = String(Math.floor(timeLeft / 60000)).padStart(2, '0');
    const seconds = String(Math.ceil((timeLeft % 60000) / 1000)).padStart(2, '0');
    return { minutes, seconds };
  };

  return {
    timeLeft,
    isRunning,
    startTimer,
    stopTimer,
    formatTime,
  };
};
