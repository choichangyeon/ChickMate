import ResumeForm from '@/features/resume/resume-form';
import UserInfoSummary from '@/features/resume/user-info-summary';

const ResumePage = () => {
  return (
    <div className='flex gap-2'>
      <ResumeForm />
      <UserInfoSummary />
    </div>
  );
};

export default ResumePage;
