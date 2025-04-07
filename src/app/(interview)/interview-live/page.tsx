import CameraView from '@/features/interview/camera-view';
import InterviewComponent from '@/features/interview/interview-component';
import VoiceInputButton from '@/features/interview/voice-input-button';

const InterviewPage = () => {
  return (
    <div>
      <CameraView />
      <VoiceInputButton />
      <InterviewComponent />
    </div>
  );
};

export default InterviewPage;
