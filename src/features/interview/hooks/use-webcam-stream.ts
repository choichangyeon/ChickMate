import { useEffect, useRef } from 'react';

type StreamCallback = (stream: MediaStream) => void;

export const useWebcamStream = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const getWebcam = async (onStreamReady: StreamCallback) => {
    try {
      const constraints = { video: { width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      onStreamReady(stream);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWebcam((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  return videoRef;
};
