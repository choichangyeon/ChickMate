'use client';

import { useAudioRecorder } from '@/features/interview/hooks/use-audio-recorder';
import { useWebcamStream } from '@/features/interview/hooks/use-webcam-stream';

const CameraView = () => {
  const videoRef = useWebcamStream();
  const { isRecording, audioBlob, startRecording, stopRecording } = useAudioRecorder();

  return (
    <div className='w-[300px]'>
      <video ref={videoRef} autoPlay />
      {/** 녹음 버튼 */}
      <button onClick={isRecording ? stopRecording : startRecording}>{isRecording ? '녹음 중지' : '녹음하기'}</button>
      {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)} />}
    </div>
  );
};

export default CameraView;
