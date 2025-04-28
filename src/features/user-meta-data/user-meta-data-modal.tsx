import UserMetaDataForm from '@/features/user-meta-data/user-meta-data-form';
import Typography from '@/components/ui/typography';

const UserMetaDataModal = () => {
  return (
    <section>
      <Typography as='h2' className='mobile:text-xl text-center text-2xl font-bold'>
        내 정보 등록하기
      </Typography>
      <UserMetaDataForm />
    </section>
  );
};

export default UserMetaDataModal;
