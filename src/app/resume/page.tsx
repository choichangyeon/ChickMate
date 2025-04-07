import { Metadata } from 'next';
import ResumeForm from '@/features/resume/resume-form';
import UserInfoSummary from '@/features/resume/user-info-summary';

export const metadata: Metadata = {
  title: '자기소개서 작성',
  description: 'Chick Mate에서 자기소개서를 관리해보세요',
};

const ResumePage = () => {
  return (
    <div className='flex gap-2'>
      <ResumeForm />
      <UserInfoSummary />
    </div>
  );
};

export default ResumePage;
