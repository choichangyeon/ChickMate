import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';
import Link from 'next/link';
const { ON_BOARDING } = PATH;

const MobileHome = () => {
  return (
    <main className='mobile-bg-class'>
      <div>
        <Typography as='h1' className='text-6xl font-black text-primary-orange-600'>
          Chick Mate
        </Typography>
        <h2 className='text-center text-xl font-thin'>
          칰메이트와 함께하는 <span className='font-bold'>AI 면접 에이전트!</span>
        </h2>
      </div>
      <Link
        href={ON_BOARDING}
        className='button-hover-focus block rounded-[50px] border border-cool-gray-900 px-[10px] py-[8px] text-center text-xl font-light'
      >
        지금 바로 시작해볼까요?
      </Link>
    </main>
  );
};

export default MobileHome;
