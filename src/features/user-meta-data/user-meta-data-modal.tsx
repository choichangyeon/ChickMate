import Typography from '@/components/ui/typography';
import UserMetaDataForm from '@/features/user-meta-data/user-meta-data-form';

const UserMetaDataModal = () => {
  return (
    <section>
      <Typography as='h1' size='lg' align='center'>
        주요 이력 작성하기
      </Typography>
      <span className='text-md mb-4 block text-center font-light text-primary-orange-600'>
        작성 완료 시 200 경험치 획득!
      </span>
      <UserMetaDataForm />
    </section>
  );
};

export default UserMetaDataModal;
