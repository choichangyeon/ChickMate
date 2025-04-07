import PersonalStatementForm from '@/features/personal-statement/personal-statement-form';
import UserInfoSummary from '@/features/personal-statement/user-info-summary';

const PersonalStatementPage = () => {
  return (
    <div className='flex gap-2'>
      <PersonalStatementForm />
      <UserInfoSummary />
    </div>
  );
};

export default PersonalStatementPage;
