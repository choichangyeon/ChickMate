import { useRef, useState } from 'react';

export const useAudioRecorder = () => {
  // 창연님을 위한 주석이니 PR 하시는 분들은 자세히 안 읽으셔도 됩니다.

  // MediaRecorder 인스턴스를 저장할 곳, 녹음 시작/중지 때 사용됨
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  // 녹음 중인지 아닌지의 상태
  const [isRecording, setIsRecording] = useState(false);
  // 녹음이 끝난 뒤, 재생하거나 다운로드할 수 있도록 오디오 Blob을 저장함
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  // MediaRecorder가 전달하는 오디오 데이터를 작은 조각(blob) 단위로 모아두는 곳
  const audioChunksRef = useRef<Blob[]>([]);

  //녹음 시작
  const startRecording = async () => {
    try {
      // 사용자한테 마이크 접근 권한 요청, 승인되면 MediaStream을 받아옴
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 오디오 포맷 설정 (MIME 타입 수정)
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });
      audioRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // 녹음 중 MediaRecorder가 데이터를 제공할 때마다 조각(chunk)을 audioChunksRef에 추가함
      // 녹음 중 데이터가 쪼개져서 순차적으로 들어오는 구조임
      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      // 녹음이 종료되면 지금까지 모은 오디오 조각들을 하나로 하벼서 Blob으로 만듦
      // Blob을 브라우저가 이해할 수 있는 가상 URL로 변환
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
      };

      // 실제 녹음을 시작함
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('마이크 접근 오류:', error);
    }
  };

  // 녹음 중단
  const stopRecording = () => {
    audioRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return { isRecording, audioBlob, startRecording, stopRecording };
};
