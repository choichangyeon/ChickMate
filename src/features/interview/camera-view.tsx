'use client';

import { useCameraStream } from '@/features/interview/hooks/use-camera-stream';
import { BlockCamera } from '@/components/icons/block-camera';
import { UsingCamera } from '@/components/icons/using-camera';
import Typography from '@/components/ui/typography';
import { UserScanFill } from '@/components/icons/user-scan-fill';

const CameraView = () => {
  const { videoRef, isCameraOn, startCamera, stopCamera } = useCameraStream();

  const handleToggleButtonClick = async () => {
    isCameraOn ? stopCamera() : await startCamera();
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-cool-gray-200 mobile:h-[220px] tablet:h-[380px] ${isCameraOn ? `bg-white` : `bg-cool-gray-300`}`}
    >
      {!isCameraOn && (
        <div className='mt-16 flex items-center justify-center mobile:mt-0'>
          <UserScanFill className='mobile:h-30 mobile:w-60' />
        </div>
      )}
      <video ref={videoRef} autoPlay playsInline className={`isCameraOn h-full w-full rounded-lg object-cover`} />
      <button
        className='outline-Natural-cool-gray-300 border-Natural-cool-gray-300 absolute left-4 top-4 z-overlay flex flex-row gap-2 rounded-full border bg-cool-gray-10 px-5 py-1'
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
