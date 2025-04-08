import { postSpeechToText } from '@/features/interview/api/client-services';
import { useState } from 'react';

type Props = {
  blob: Blob;
};

const STTComponent = ({ blob }: Props) => {
  const [voiceText, setVoiceText] = useState<string>('');
  const handleClick = async () => {
    try {
      const text = await postSpeechToText({ blob });
      setVoiceText(text);
    } catch (error) {
      // TODO : ERROR 처리
      alert(error.message);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>테스트2</button>
    </div>
  );
};

export default STTComponent;
