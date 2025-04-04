import CameraView from '@/features/interview/camera-view';
import VoiceInputButton from '@/features/interview/voice-input-button';
import STTComponent from '@/features/ai-interview/stt-component';

const InterviewPage = () => {
  return (
    <div>
      <CameraView />
      <VoiceInputButton />
      <STTComponent />
    </div>
  );
};

export default InterviewPage;
