import { postOpenAIQuestion, postSpeechToText, postTextToSpeech } from '@/features/interview/api/client-services';
import { getErrorMessage } from '@/utils/get-error-message';

type Props = {
  blob: Blob;
  interviewId: number;
  interviewType: string;
};

export const handleVoiceToAIFlow = async ({ blob, interviewId, interviewType }: Props) => {
  try {
    const userAnswer = await postSpeechToText({ blob, interviewId });
    const aiQuestion = await postOpenAIQuestion({ userAnswer, interviewId, interviewType });
    const audioUrl = await postTextToSpeech({ aiQuestion, interviewType });

    const audio = new Audio(audioUrl);

    return { audio, aiQuestion };
  } catch (error) {
    alert(getErrorMessage(error));
  }
};
