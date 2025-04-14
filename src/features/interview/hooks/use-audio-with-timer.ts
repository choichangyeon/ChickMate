import { useState } from 'react';
import { useAudioRecorder } from '@/features/interview/hooks/use-audio-recorder';
import { useTimer } from '@/features/interview/hooks/use-timer';
import { getOpenAIResponse, postSpeechToText } from '@/features/interview/api/client-services';
import { INTERVIEW_PROMPT } from '@/constants/interview-constants';
import type { Message } from '@/types/message';
import type { InterviewHistoryWithResume } from '@/types/interview';

const { CALM_PROMPT, PRESSURE_PROMPT } = INTERVIEW_PROMPT;

export const useAudioWithTimer = (duration: number, interviewHistory: InterviewHistoryWithResume) => {
  const { interviewType, resume } = interviewHistory;
  const type = interviewType === 'calm' ? CALM_PROMPT : PRESSURE_PROMPT;

  /** state */
  // const [transcribedText, setTranscribedText] = useState('');
  const init_state: Message[] = [
    {
      role: 'system',
      content: [...type.content, { type: 'text', text: `지원자의 자기소개서: ${resume}` }],
    },
  ];
  const [messageList, setMessageList] = useState<Message[]>(init_state);

  /** hook */
  const { isRecording, startRecording, stopRecording } = useAudioRecorder();

  /** function */
  const handleTimerComplete = () => {
    stopRecording();
  };

  const { startTimer, stopTimer, timeLeft, formatTime } = useTimer({
    duration,
    onTimerComplete: handleTimerComplete,
  });

  const startRecordingWithTimer = () => {
    startRecording();
    // setTranscribedText('');
    startTimer();
  };

  const stopRecordingWithTimer = async () => {
    stopTimer();
    const blob = await stopRecording();

    try {
      const answerText = await postSpeechToText({ blob });
      console.log(answerText);
      getOpenAIInterviewContent(answerText);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const getOpenAIInterviewContent = async (answerText: string) => {
    try {
      const updatedMessageList: Message[] = [
        ...messageList,
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: answerText,
            },
          ],
        },
      ];
      const response = await getOpenAIResponse({ messageList: updatedMessageList });
      setMessageList(response);
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        alert(error);
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
