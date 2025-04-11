import TabsField from '@/features/my-page/tabs-field';
import UserField from '@/features/my-page/user-field';

const MyPage = () => {
  return (
    <article className='flex items-center gap-2 px-24'>
      <UserField />
      <TabsField />
    </article>
  );
};

export default MyPage;
