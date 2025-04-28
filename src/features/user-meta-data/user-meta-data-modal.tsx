import UserMetaDataForm from '@/features/user-meta-data/user-meta-data-form';
import Typography from '@/components/ui/typography';

const UserMetaDataModal = () => {
  return (
    <section>
      <Typography as='h2' size='2xl' align='center' weight='bold'>
        내 정보 등록하기
      </Typography>
      <UserMetaDataForm />
    </section>
  );
};

export default UserMetaDataModal;
