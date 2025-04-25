import { INTERVIEW_MESSAGE } from '@/constants/message-constants';
import { getErrorMessage } from '@/utils/get-error-message';
import { useCallback, useEffect, useRef, useState } from 'react';

const { CAMERA_ACCESS } = INTERVIEW_MESSAGE;

type StreamCallback = (stream: MediaStream) => void;

export const useCameraStream = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = useCallback(async (onStreamReady?: StreamCallback) => {
    if (streamRef.current) {
      if (onStreamReady) onStreamReady(streamRef.current);
      return;
    }

    const constraints = { video: { width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          setIsCameraOn(true);
        };
      }
      if (onStreamReady) onStreamReady(stream);
      setIsCameraOn(true);
    } catch (error) {
      alert(getErrorMessage(CAMERA_ACCESS));
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraOn(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return { videoRef, isCameraOn, startCamera, stopCamera };
};
