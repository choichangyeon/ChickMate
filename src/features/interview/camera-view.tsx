'use client';

import { useCameraStream } from '@/features/interview/hooks/use-camera-stream';

const CameraView = () => {
  const { videoRef, isCameraOn, startCamera, stopCamera } = useCameraStream();

  const handleToggleButtonClick = async () => {
    isCameraOn ? stopCamera() : await startCamera();
  };

  return (
    <div className='flex-1 rounded-lg border border-cool-gray-200 bg-white'>
      <video ref={videoRef} autoPlay playsInline className='h-full w-full rounded-lg object-cover' />
      <button onClick={handleToggleButtonClick}>카메라 온오프</button>
    </div>
  );
};

export default CameraView;
