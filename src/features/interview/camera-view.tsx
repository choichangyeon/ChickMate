'use client';

import { useWebcamStream } from '@/features/interview/hooks/use-webcam-stream';

const CameraView = () => {
  const videoRef = useWebcamStream();

  return (
    <div className='w-[300px]'>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default CameraView;
