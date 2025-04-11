import { useAudioRecorder } from '@/features/interview/hooks/use-audio-recorder';
import { useTimer } from '@/features/interview/hooks/use-timer';

export const useAudioWithTimer = (duration: number) => {
  const { audioBlob, startRecording, stopRecording } = useAudioRecorder();

  const handleTimerComplete = () => {
    stopRecording();
  };

  const { startTimer, stopTimer, isRunning, timeLeft, formatTime } = useTimer({
    duration,
    onTimerComplete: handleTimerComplete,
  });

  const startRecordingWithTimer = () => {
    startRecording();
    startTimer();
  };

  const stopRecordingWithTimer = () => {
    stopRecording();
    stopTimer();
  };

  return {
    audioBlob,
    isRecording: isRunning,
    timeLeft,
    formattedTime: formatTime(),
    startRecordingWithTimer,
    stopRecordingWithTimer,
  };
};
