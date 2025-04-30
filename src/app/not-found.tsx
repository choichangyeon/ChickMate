import Image from 'next/image';
import MainLayout from '@/app/(with-nav)/layout';
import BlockComponent from '@/components/common/block-component';
import { PATH } from '@/constants/path-constant';

const { ON_BOARDING } = PATH;

const NotFound = () => {
  return (
    <MainLayout>
      <section className='flex h-full flex-col items-center justify-center bg-[url("/assets/sub_background.png")] mobile:bg-[url("/assets/visual_assets.png")]'>
        <div>
          <Image src='/assets/notfound.png' width={480} height={310} alt='404 NOT FOUND' />
          <BlockComponent
            firstLine=''
            secondLine='이런! 페이지를 찾을 수 없습니다'
            thirdLine='괜찮아요. 우리는 언제나 길을 잃을 수 있어요.'
            buttonName='메인으로 돌아가기'
            href={ON_BOARDING}
            className='h-[120px] mobile:h-[80px]'
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default NotFound;
