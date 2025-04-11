'use client';

import { useWebcamStream } from '@/features/interview/hooks/use-webcam-stream';

const CameraView = () => {
  const videoRef = useWebcamStream();

  return (
    <div className='flex-1'>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default CameraView;
