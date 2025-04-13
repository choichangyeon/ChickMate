import { useState } from 'react';
import { useAudioRecorder } from '@/features/interview/hooks/use-audio-recorder';
import { useTimer } from '@/features/interview/hooks/use-timer';
import { postSpeechToText } from '@/features/interview/api/client-services';

export const useAudioWithTimer = (duration: number) => {
  const [transcribedText, setTranscribedText] = useState('');

  const { audioBlob, startRecording, stopRecording } = useAudioRecorder();

  const handleTimerComplete = () => {
    stopRecording();
  };

  const { startTimer, stopTimer, isRunning, timeLeft, formatTime } = useTimer({
    duration,
    onTimerComplete: handleTimerComplete,
  });

  const startRecordingWithTimer = () => {
    setTranscribedText('');
    startRecording();
    startTimer();
  };

  const stopRecordingWithTimer = () => {
    stopRecording();
    stopTimer();
    if (audioBlob) {
      transcribeAudio(audioBlob);
    }
  };

  const transcribeAudio = async (blob: Blob) => {
    try {
      const text = await postSpeechToText({ blob });
      setTranscribedText(text);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
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
