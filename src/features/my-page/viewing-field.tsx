import MyPageCharacter from '@/features/character/my-page-character';
import { Session } from 'next-auth';
import MyInfo from '@/features/my-page/my-info';

type Props = {
  session: Session;
};

const ViewingField = ({ session }: Props) => {
  return (
    <section className='h-[80dvh] w-1/2'>
      <div className='mb-8 flex w-full items-center justify-center'>
        <MyPageCharacter session={session} />
      </div>
      <MyInfo session={session} />
    </section>
  );
};

export default ViewingField;
