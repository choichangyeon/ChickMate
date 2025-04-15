import { useState } from 'react';
import { useAudioRecorder } from '@/features/interview/hooks/use-audio-recorder';
import { useTimer } from '@/features/interview/hooks/use-timer';
import {
  getOpenAIResponse,
  patchInterviewHistory,
  postSpeechToText,
  postTextToSpeech,
} from '@/features/interview/api/client-services';
import { FEEDBACK_PROMPT, INTERVIEW_PROMPT } from '@/constants/interview-constants';
import type { Message } from '@/types/message';
import type { InterviewHistoryWithResume } from '@/types/interview';

const { CALM_PROMPT, PRESSURE_PROMPT } = INTERVIEW_PROMPT;

export const LIMIT_COUNT = 5;
export const FEEDBACK_COUNT = LIMIT_COUNT + 1;

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

      const content = { question: interviewQnA.question, answer: answerText };
      const interview = await patchInterviewHistory({ interviewId: id, content });

      if (interview.content.length > 9) {
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
      console.log('메시지 길이 ', messageList.length);
      const updatedMessageList: Message[] =
        messageList.length < LIMIT_COUNT
          ? [
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
            ]
          : [
              {
                'role': 'system',
                'content': [
                  {
                    'type': 'text',
                    'text': `You are an AI interview evaluator who reviews a user’s interview responses and provides feedback based on the evaluation criteria below.\nPlease write one sentence each for the strength and area for improvement for each competency.\nWhen describing areas for improvement, focus on constructive suggestions rather than negative criticism.\nIf a particular competency is not evident or not covered in the response, write “답변에서 확인 어려움”.\n\n[Feedback Output Format]\nPlease provide the feedback in the following JSON format. Each item should be a single object where the competency name is the key, and it contains two inner keys: \"장점\" and \"단점\".\nYou must use exactly the following five competency names (in Korean) as keys:\n\"communication\", \"problemSolving\", \"proactivity\", \"growthPotential\", \"interestInTheRole\"\nAll key names and feedback content must be written in Korean.\n\nExample:\n[\n  {\n    \"communication\": {\n      \"strength\": \"Your feedback here\",\n      \"improvement\": \"Your feedback here\"\n    }\n  }\n]`,
                  },
                ],
              },
            ];

      const { messageList: newMessageList, question } = await getOpenAIResponse({ messageList: updatedMessageList });
      setMessageList(newMessageList);
      setInterviewQnA((prev) => ({ ...prev, question }));

      console.log('질문 답변 ', messageList);

      console.log('QnA ', interviewQnA);

      if (messageList.length === LIMIT_COUNT) {
        console.log('패치 보낼때 ', messageList);
        await patchInterviewHistory({ interviewId: id, feedback: question });
      }
      // await postTextToSpeech({
      //   text: question,
      //   type: interviewType,
      // });
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
