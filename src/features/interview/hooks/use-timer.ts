import { useEffect, useRef, useState } from 'react';

type Props = {
  duration: number;
  onTimerComplete?: () => void;
};

export const useTimer = ({ duration, onTimerComplete }: Props) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return;

    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const timeElapsed = Date.now() - startTime;
      const newTimeLeft = duration - timeElapsed;

      if (newTimeLeft <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTimeLeft(duration);
        if (onTimerComplete) onTimerComplete();
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

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
    startTimer,
    stopTimer,
    formatTime,
  };
};
