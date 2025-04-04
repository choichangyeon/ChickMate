'use client';

import { useAudioRecorder } from '@/features/interview/hooks/use-audio-recorder';
import STTComponent from '@/features/interview/stt-component';

const VoiceInputButton = () => {
  const { isRecording, audioBlob, startRecording, stopRecording } = useAudioRecorder();

  return (
    <>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? '답변 완료하기' : '답변하기'}
      </button>
      {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)} />}
      <STTComponent blob={audioBlob} />
    </>
  );
};

export default VoiceInputButton;
