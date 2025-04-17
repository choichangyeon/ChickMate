'use client';

import { useCameraStream } from '@/features/interview/hooks/use-camera-stream';

const CameraView = () => {
  const videoRef = useCameraStream();

  return (
    <div className='flex-1 rounded-lg border border-cool-gray-200 bg-white'>
      <video ref={videoRef} autoPlay className='h-full w-full rounded-lg object-cover' />
    </div>
  );
};

export default CameraView;
