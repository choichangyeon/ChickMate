'use client';

import { useCameraStream } from '@/features/interview/hooks/use-camera-stream';
import { BlockCamera } from '@/components/icons/block-camera';
import { UsingCamera } from '@/components/icons/using-camera';
import Typography from '@/components/ui/typography';
import Image from 'next/image';

const CameraView = () => {
  const { videoRef, isCameraOn, startCamera, stopCamera } = useCameraStream();

  const handleToggleButtonClick = async () => {
    isCameraOn ? stopCamera() : await startCamera();
  };

  return (
    <div className='relative flex-1 overflow-hidden rounded-lg border border-cool-gray-200 bg-white'>
      <video ref={videoRef} autoPlay playsInline className={`isCameraOn h-full w-full rounded-lg object-cover`} />
      <button
        className='z-overlay outline-Natural-cool-gray-300 border-Natural-cool-gray-300 absolute left-4 top-4 flex flex-row gap-2 rounded-full border bg-cool-gray-10 px-5 py-1'
        onClick={handleToggleButtonClick}
      >
        <Typography color='gray-700' weight='bold'>
          카메라
        </Typography>
        {isCameraOn ? <UsingCamera /> : <BlockCamera />}
      </button>
    </div>
  );
};

export default CameraView;
