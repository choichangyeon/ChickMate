import { useState } from 'react';
import { useAudioRecorder } from '@/features/interview/hooks/use-audio-recorder';
import { useTimer } from '@/features/interview/hooks/use-timer';
import {
  getOpenAIResponse,
  patchInterviewHistory,
  postSpeechToText,
  postTextToSpeech,
} from '@/features/interview/api/client-services';
import { INTERVIEW_PROMPT } from '@/constants/interview-constants';
import type { Message } from '@/types/message';
import type { InterviewHistoryWithResume } from '@/types/interview';

const { CALM_PROMPT, PRESSURE_PROMPT } = INTERVIEW_PROMPT;

export const useAudioWithTimer = (duration: number, interviewHistory: InterviewHistoryWithResume) => {
  const { interviewType, resume, id } = interviewHistory;
  const type = interviewType === 'calm' ? CALM_PROMPT : PRESSURE_PROMPT;
  const [interviewQnA, setInterviewQnA] = useState({
    question: '간단한 자기소개 부탁드립니다',
    answer: '',
  });

  /** state */
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

  // 녹음 시작
  const startRecordingWithTimer = () => {
    startRecording();
    startTimer();
  };

  // 녹음 중단 (사용자 음성 -> 텍스트 변환 + DB에 저장)
  const stopRecordingWithTimer = async () => {
    stopTimer();
    const blob = await stopRecording();

    // 사용자 음성을 텍스트로 변환해주는 로직
    try {
      const answerText = await postSpeechToText({ blob });
      getOpenAIInterviewContent(answerText);

      const data = { question: interviewQnA.question, answer: answerText };
      const interview = await patchInterviewHistory({ interviewId: id, data });

      if (interview.content.length === 8) {
        return;
      }

      setInterviewQnA((prev) => {
        return { ...prev, answer: answerText };
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // AI 면접관이랑 면접 보는 로직
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
      const { messageList: newMessageList, question } = await getOpenAIResponse({ messageList: updatedMessageList });
      setMessageList(newMessageList);
      setInterviewQnA((prev) => ({ ...prev, question }));

      await postTextToSpeech({
        text: question,
        type: interviewType,
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error);
      }
    }
  };

  return {
    messageList,
    isRecording,
    timeLeft,
    formattedTime: formatTime(),
    startRecordingWithTimer,
    stopRecordingWithTimer,
  };
};
