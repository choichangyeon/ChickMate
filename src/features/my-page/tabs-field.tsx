import ListByTab from '@/features/my-page/list-by-tab';
import TabButtons from '@/features/my-page/tab-buttons';

const TabsField = () => {
  return (
    <section className='w-1/2 rounded-t-lg border'>
      <TabButtons />
      <div className='p-8'>
        <ListByTab />
      </div>
    </section>
  );
};

export default TabsField;
