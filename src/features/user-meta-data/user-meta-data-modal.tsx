import Typography from '@/components/ui/typography';
import { useMetaDataForm } from './hooks/use-meta-data-form';
import UserMetaDataForm from './user-meta-data-form';

const UserMetaDataModal = () => {
  return (
    <section>
      <Typography as='h3'>주요 이력 작성하기</Typography>
      <UserMetaDataForm />
    </section>
  );
};

export default UserMetaDataModal;
