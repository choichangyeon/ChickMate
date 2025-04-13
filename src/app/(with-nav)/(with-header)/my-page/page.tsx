import TabsField from '@/features/my-page/tabs-field';
import ViewingField from '@/features/my-page/viewing-field';

const MyPage = () => {
  return (
    <article className='flex items-center gap-2 px-24'>
      <ViewingField />
      <TabsField />
    </article>
  );
};

export default MyPage;
