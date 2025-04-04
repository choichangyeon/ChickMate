'use client';

import { useAudioRecorder } from './hooks/useAudioRecorder';
import { useWebcamStream } from './hooks/useWebcamStream';

const CameraView = () => {
  const videoRef = useWebcamStream();
  const { isRecording, audioURL, startRecording, stopRecording } = useAudioRecorder();

  return (
    <div className='w-[300px]'>
      <video ref={videoRef} autoPlay />
      {/** 녹음 버튼 */}
      <button onClick={isRecording ? stopRecording : startRecording}>{isRecording ? '녹음 중지' : '녹음하기'}</button>
      {audioURL && <audio controls src={audioURL} />}
    </div>
  );
};

export default CameraView;
