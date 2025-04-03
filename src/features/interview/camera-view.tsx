'use client';

import { useWebcamStream } from './hooks/useWebcamStream';

const CameraView = () => {
  const videoRef = useWebcamStream();

  return (
    <div className='w-[300px]'>
      <video ref={videoRef} autoPlay />
      <button>녹음하기</button>
    </div>
  );
};

export default CameraView;
