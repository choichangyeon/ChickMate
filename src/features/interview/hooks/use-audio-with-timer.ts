import { useState } from 'react';
import { useAudioRecorder } from '@/features/interview/hooks/use-audio-recorder';
import { useTimer } from '@/features/interview/hooks/use-timer';
import { postSpeechToText } from '@/features/interview/api/client-services';
import { InterviewHistory } from '@prisma/client';

export const useAudioWithTimer = (duration: number, interviewHistory: InterviewHistory | null) => {
  const [transcribedText, setTranscribedText] = useState('');

  const { isRecording, startRecording, stopRecording } = useAudioRecorder();

  const handleTimerComplete = () => {
    stopRecording();
  };

  const { startTimer, stopTimer, timeLeft, formatTime } = useTimer({
    duration,
    onTimerComplete: handleTimerComplete,
  });

  const startRecordingWithTimer = () => {
    startRecording();
    setTranscribedText('');
    startTimer();
  };

  const stopRecordingWithTimer = async () => {
    stopTimer();
    const blob = await stopRecording();

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
    isRecording,
    timeLeft,
    formattedTime: formatTime(),
    startRecordingWithTimer,
    stopRecordingWithTimer,
  };
};
