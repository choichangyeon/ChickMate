import ResumeForm from '@/features/resume/resume-form';
import UserInfoSummary from '@/features/resume/user-info-summary';

type Params = {
  params: {
    id: string;
  };
};

const ResumePage = ({ params }: Params) => {
  const id = params.id;

  return (
    <div className='flex gap-2'>
      <ResumeForm />
      <UserInfoSummary />
    </div>
  );
};

export default ResumePage;
