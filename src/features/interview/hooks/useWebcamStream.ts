import { useEffect, useRef } from 'react';

type StreamCallback = (stream: MediaStream) => void;

export const useWebcamStream = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const getWebcam = (callback: StreamCallback) => {
    try {
      const constraints = { video: { width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(callback)
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWebcam((stream: MediaStream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  return videoRef;
};
